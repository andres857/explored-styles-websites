#!/usr/bin/env node
// tokens.json (DTCG 2025.10) de un run -> tokens.css, una propiedad CSS por token.
//   color.text.primary -> --color-text-primary
//   font.lineHeight.7  -> --font-line-height-7
//   space.9            -> --space-9
//
// Uso:  node preview/galeria-air/build-tokens.mjs runs/<id>
// Sin dependencias. Escribe tokens.css junto a este script.
// Solo copia valores y recuentos de uso: no copia URLs de páginas ni selectores.

import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const runArg = process.argv[2];
if (!runArg) {
  console.error('Uso: node preview/galeria-air/build-tokens.mjs runs/<id>');
  process.exit(1);
}
const runDir = resolve(runArg);
const source = join(runDir, 'tokens.json');

class TokenError extends Error {}
const bad = (path, why) => { throw new TokenError(`${path.join('.')}: ${why}`); };

const toKebab = (part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const propertyName = (path) => `--${path.map(toKebab).join('-')}`;

// Alias DTCG "{grupo.token}" -> var(--grupo-token)
function alias(value) {
  const match = typeof value === 'string' ? /^\{([^{}]+)\}$/.exec(value) : null;
  return match ? `var(${propertyName(match[1].split('.'))})` : null;
}

const byte = (n) => Math.round(Math.min(1, Math.max(0, n)) * 255).toString(16).padStart(2, '0');

function cssColor(value, path) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') bad(path, 'color sin valor');
  let hex = typeof value.hex === 'string' ? value.hex.toLowerCase() : null;
  if (!hex) {
    if (value.colorSpace !== 'srgb' || !Array.isArray(value.components) || value.components.length !== 3) {
      bad(path, `color sin "hex" en un espacio que no se convierte (${value.colorSpace})`);
    }
    hex = `#${value.components.map(byte).join('')}`;
  }
  const alpha = typeof value.alpha === 'number' ? value.alpha : 1;
  return alpha >= 1 ? hex : `${hex}${byte(alpha)}`;
}

function cssDimension(value, path) {
  if (typeof value === 'number') return value === 0 ? '0' : `${value}px`;
  if (typeof value === 'string') return value;
  if (!value || typeof value.value !== 'number' || typeof value.unit !== 'string') {
    bad(path, 'dimension sin { value, unit }');
  }
  return `${value.value}${value.unit}`;
}

function cssFontFamily(value, path) {
  const names = Array.isArray(value) ? value : [value];
  if (names.length === 0 || names.some((name) => typeof name !== 'string' || name === '')) {
    bad(path, 'fontFamily vacío o no textual');
  }
  // Un identificador CSS simple va sin comillas (incluye las familias genéricas).
  return names
    .map((name) => (/^-?[A-Za-z_][A-Za-z0-9_-]*$/.test(name) ? name : `"${name.replace(/["\\]/g, '\\$&')}"`))
    .join(', ');
}

function cssShadow(value, path) {
  const layers = Array.isArray(value) ? value : [value];
  if (layers.length === 0) bad(path, 'sombra sin capas');
  return layers
    .map((layer) => {
      if (!layer || typeof layer !== 'object') bad(path, 'capa de sombra sin valor');
      const parts = [
        cssDimension(layer.offsetX ?? 0, path),
        cssDimension(layer.offsetY ?? 0, path),
        cssDimension(layer.blur ?? 0, path),
        cssDimension(layer.spread ?? 0, path),
        alias(layer.color) ?? cssColor(layer.color, path),
      ];
      if (layer.inset === true) parts.push('inset');
      return parts.join(' ');
    })
    .join(', ');
}

function cssScalar(value, path) {
  if (typeof value !== 'number' && typeof value !== 'string') bad(path, 'valor no escalar');
  return String(value);
}

const WRITERS = {
  color: cssColor,
  dimension: cssDimension,
  fontFamily: cssFontFamily,
  fontWeight: cssScalar,
  number: cssScalar,
  shadow: cssShadow,
};

function collect(node, path, inheritedType, out, names) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) bad(path, 'grupo no válido');
  const type = typeof node.$type === 'string' ? node.$type : inheritedType;
  if (Object.hasOwn(node, '$value')) {
    const write = WRITERS[type];
    if (!write) bad(path, `tipo no soportado: ${type}`);
    const name = propertyName(path);
    if (names.has(name)) bad(path, `${name} ya lo produce ${names.get(name)}`);
    names.set(name, path.join('.'));
    const count = node.$extensions?.['explorer.usage']?.count;
    out.push({
      group: path[0],
      name,
      value: alias(node.$value) ?? write(node.$value, path),
      comment: typeof count === 'number' ? `${path.join('.')} · usos: ${count}` : path.join('.'),
    });
    return;
  }
  for (const key of Object.keys(node)) {
    if (!key.startsWith('$')) collect(node[key], [...path, key], type, out, names);
  }
}

let declarations;
try {
  const tree = JSON.parse(readFileSync(source, 'utf8'));
  declarations = [];
  collect(tree, [], undefined, declarations, new Map());
} catch (error) {
  console.error(`No se pudo convertir ${source}: ${error.message}`);
  process.exit(1);
}

const lines = [
  '/* GENERADO por build-tokens.mjs. No editar a mano.',
  ` * Run: ${basename(runDir)}`,
  ` * Tokens: ${declarations.length}`,
  ' */',
  ':root {',
];
let currentGroup;
for (const { group, name, value, comment } of declarations) {
  if (group !== currentGroup) {
    if (currentGroup !== undefined) lines.push('');
    lines.push(`  /* ${group} */`);
    currentGroup = group;
  }
  lines.push(`  ${name}: ${value}; /* ${comment} */`);
}
lines.push('}', '');

const target = join(HERE, 'tokens.css');
writeFileSync(target, lines.join('\n'));
console.log(`${declarations.length} tokens -> ${target}`);
