#!/usr/bin/env node
// Convierte el tokens.json (DTCG 2025.10) de un run en tokens.css.
// Una propiedad CSS por token: color.text.primary -> --color-text-primary,
// font.lineHeight.14 -> --font-line-height-14, space.2 -> --space-2.
//
// Uso:  node preview/visor-pdf/build-tokens.mjs runs/<id>
// Sin dependencias. Escribe tokens.css junto a este script.

import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const runArg = process.argv[2];
if (!runArg) {
  console.error('Uso: node preview/visor-pdf/build-tokens.mjs runs/<id>');
  process.exit(1);
}

const runDir = resolve(runArg);
const tokensPath = join(runDir, 'tokens.json');
const outPath = join(dirname(fileURLToPath(import.meta.url)), 'tokens.css');

let tree;
try {
  tree = JSON.parse(readFileSync(tokensPath, 'utf8'));
} catch (error) {
  console.error(`No se pudo leer ${tokensPath}: ${error.message}`);
  process.exit(1);
}

const GENERIC_FAMILIES = new Set([
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif',
  'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong',
]);

const kebab = (segment) => segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const cssName = (path) => `--${path.map(kebab).join('-')}`;

function fail(path, message) {
  throw new Error(`${path.join('.')}: ${message}`);
}

function reference(value) {
  // Alias DTCG: "{color.palette.4}" -> var(--color-palette-4)
  if (typeof value !== 'string') return null;
  const match = /^\{([^{}]+)\}$/.exec(value);
  return match ? `var(${cssName(match[1].split('.'))})` : null;
}

function color(value, path) {
  const alias = reference(value);
  if (alias) return alias;
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') fail(path, 'color sin valor');
  const alpha = typeof value.alpha === 'number' ? value.alpha : 1;
  let hex = typeof value.hex === 'string' ? value.hex.toLowerCase() : null;
  if (!hex) {
    if (value.colorSpace !== 'srgb' || !Array.isArray(value.components)) {
      fail(path, `color sin "hex" y con un espacio que este script no convierte (${value.colorSpace})`);
    }
    hex = `#${value.components
      .map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, '0'))
      .join('')}`;
  }
  if (alpha >= 1) return hex;
  return `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
}

function dimension(value, path) {
  const alias = reference(value);
  if (alias) return alias;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value === 0 ? '0' : `${value}px`;
  if (!value || typeof value.value !== 'number' || typeof value.unit !== 'string') {
    fail(path, 'dimension sin { value, unit }');
  }
  return `${value.value}${value.unit}`;
}

function fontFamily(value, path) {
  const alias = reference(value);
  if (alias) return alias;
  const list = Array.isArray(value) ? value : [value];
  if (list.length === 0 || list.some((name) => typeof name !== 'string')) {
    fail(path, 'fontFamily vacío o con valores que no son texto');
  }
  return list
    .map((name) => (GENERIC_FAMILIES.has(name) || /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name)
      ? name
      : `"${name.replace(/"/g, '\\"')}"`))
    .join(', ');
}

function shadow(value, path) {
  const alias = reference(value);
  if (alias) return alias;
  const layers = Array.isArray(value) ? value : [value];
  return layers
    .map((layer) => {
      if (!layer || typeof layer !== 'object') fail(path, 'capa de sombra sin valor');
      const parts = [
        dimension(layer.offsetX, path),
        dimension(layer.offsetY, path),
        dimension(layer.blur ?? 0, path),
        dimension(layer.spread ?? 0, path),
        color(layer.color, path),
      ];
      if (layer.inset) parts.push('inset');
      return parts.join(' ');
    })
    .join(', ');
}

const CONVERTERS = {
  color,
  dimension,
  fontFamily,
  shadow,
  fontWeight: (value, path) => reference(value) ?? (
    typeof value === 'number' || typeof value === 'string' ? String(value) : fail(path, 'fontWeight sin valor')
  ),
  number: (value, path) => reference(value) ?? (
    typeof value === 'number' ? String(value) : fail(path, 'number sin valor')
  ),
  duration: (value, path) => dimension(value, path),
};

const declarations = [];
const seen = new Map();

function walk(node, path, inheritedType) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) fail(path, 'grupo no válido');
  const type = node.$type ?? inheritedType;
  if ('$value' in node) {
    const convert = CONVERTERS[type];
    if (!convert) fail(path, `tipo de token no soportado: ${type}`);
    const name = cssName(path);
    if (seen.has(name)) fail(path, `colisión de nombre con ${seen.get(name)} (${name})`);
    seen.set(name, path.join('.'));
    const usage = node.$extensions?.['explorer.usage']?.count;
    declarations.push({
      group: path[0],
      name,
      value: convert(node.$value, path),
      note: typeof usage === 'number' ? `${path.join('.')} · ${usage} ${usage === 1 ? 'uso' : 'usos'}` : path.join('.'),
    });
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    walk(child, [...path, key], type);
  }
}

try {
  walk(tree, [], undefined);
} catch (error) {
  console.error(`Error al convertir ${tokensPath}: ${error.message}`);
  process.exit(1);
}

const lines = [
  '/* GENERADO por build-tokens.mjs. No editar a mano.',
  ` * Run: ${basename(runDir)}`,
  ` * Tokens: ${declarations.length}`,
  ' */',
  ':root {',
];
let group = null;
for (const declaration of declarations) {
  if (declaration.group !== group) {
    if (group !== null) lines.push('');
    group = declaration.group;
    lines.push(`  /* ${group} */`);
  }
  lines.push(`  ${declaration.name}: ${declaration.value}; /* ${declaration.note} */`);
}
lines.push('}', '');

writeFileSync(outPath, lines.join('\n'));
console.log(`${declarations.length} tokens -> ${outPath}`);
