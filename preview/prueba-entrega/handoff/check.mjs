#!/usr/bin/env node
// Comprueba que una vista usa los tokens de este paquete y no valores escritos a mano.
//   node check.mjs <archivo o carpeta> [más archivos o carpetas]
// Sale con 0 si no hay problemas, con 1 si los hay y con 2 si se usa mal.
// Una línea que contenga "handoff-allow" no se revisa: úsalo para excepciones justificadas.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const EXTENSIONS = new Set(['.css', '.scss', '.less', '.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro']);
const SKIPPED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);
const KEYWORDS = new Set(['inherit', 'initial', 'unset', 'revert', 'none', '0', '50%', '100%', 'normal']);

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('Uso: node check.mjs <archivo o carpeta>...');
  process.exit(2);
}

const tokens = new Set();
for (const match of readFileSync(join(HERE, 'tokens.css'), 'utf8').matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)) {
  tokens.add(match[1]);
}

const files = [];
function walk(target) {
  const full = resolve(target);
  // El propio paquete y las copias de tokens.css no son la vista.
  if (full === HERE || basename(full) === 'tokens.css') return;
  const stat = statSync(full);
  if (stat.isDirectory()) {
    if (SKIPPED_DIRS.has(basename(full))) return;
    for (const name of readdirSync(full).sort()) walk(join(full, name));
  } else if (EXTENSIONS.has(extname(full))) {
    files.push(full);
  }
}
try {
  for (const target of targets) walk(target);
} catch (error) {
  console.error('No se pudo leer: ' + error.message);
  process.exit(2);
}
if (files.length === 0) {
  console.error('No hay archivos que revisar en: ' + targets.join(', '));
  process.exit(2);
}

const sources = files.map((file) => ({ file, lines: readFileSync(file, 'utf8').split('\n') }));

// Propiedades personalizadas que la propia vista define (alias de tokens, medidas de maquetación).
const local = new Set();
for (const { lines } of sources) {
  for (const line of lines) {
    for (const match of line.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) local.add(match[1]);
  }
}

const COLOR = /(?::[^;{}]*?|['"])(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4}))(?![0-9a-zA-Z_-])|\b((?:rgba?|hsla?|oklch|oklab|lab|lch)\()/g;
const PROPERTY = /(font-size|font-family|border-radius|box-shadow|fontSize|fontFamily|borderRadius|boxShadow)\s*:\s*(?:'([^']*)'|"([^"]*)"|([^;}\n]+))/g;
const VAR = /var\(\s*(--[A-Za-z0-9_-]+)/g;

const problems = [];
const used = new Set();
for (const { file, lines } of sources) {
  lines.forEach((line, index) => {
    if (line.includes('handoff-allow')) return;
    const where = file + ':' + (index + 1);
    for (const match of line.matchAll(VAR)) {
      if (tokens.has(match[1])) used.add(match[1]);
      else if (!local.has(match[1])) problems.push([where, 'token inexistente', match[1]]);
    }
    for (const match of line.matchAll(COLOR)) {
      problems.push([where, 'color escrito a mano', match[1] ?? match[2] + '…)']);
    }
    for (const match of line.matchAll(PROPERTY)) {
      // Entre comillas (objeto de estilos) el valor acaba en la comilla; en CSS, en el punto y coma.
      const value = (match[2] ?? match[3] ?? match[4]).trim();
      if (value.includes('var(') || KEYWORDS.has(value)) continue;
      problems.push([where, match[1] + ' escrito a mano', value]);
    }
  });
}

for (const [where, kind, text] of problems) console.log(where + '  ' + kind + ': ' + text);
console.log('');
console.log('Archivos revisados: ' + files.length);
console.log('Tokens usados: ' + used.size + ' de ' + tokens.size);
console.log('Problemas: ' + problems.length);
process.exit(problems.length === 0 ? 0 : 1);
