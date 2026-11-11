#!/usr/bin/env node
// Vista de prueba de un run del Explorador de estilos web.
// Uso: node preview/build.mjs runs/<id> [--out <carpeta>]
// Sin dependencias. Genera index.html y screenshots/ junto a este script (o en --out).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const BAJO_USO = 2; // un token con este número de usos o menos se marca como "poco usado"

// ---------- entrada ----------

const args = process.argv.slice(2);
let outDir = dirname(fileURLToPath(import.meta.url));
const iOut = args.indexOf('--out');
if (iOut !== -1) {
  if (!args[iOut + 1]) fail('Falta la carpeta después de --out.');
  outDir = resolve(args[iOut + 1]);
  args.splice(iOut, 2);
}
if (args.length !== 1) fail('Uso: node preview/build.mjs runs/<id> [--out <carpeta>]');
const runDir = resolve(args[0]);
if (!existsSync(runDir)) fail(`No existe la carpeta del run: ${runDir}`);

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const avisos = [];
function readJson(name) {
  const p = join(runDir, name);
  if (!existsSync(p)) {
    avisos.push(`Falta ${name} en el run.`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (err) {
    avisos.push(`${name} no se pudo leer como JSON (${err.message}).`);
    return null;
  }
}

const run = readJson('run.json');
const pagesRaw = readJson('pages.json');
const dtcg = readJson('tokens.json');
const report = readJson('report.json');
if (!dtcg && !report) fail('El run no tiene tokens.json ni report.json: no hay nada que mostrar.');

// ---------- utilidades ----------

const e = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const natural = (a, b) => a.localeCompare(b, 'en', { numeric: true });
const num = (n) => String(Math.round(n * 1000) / 1000).replace('.', ',');
const usosTxt = (n) => (n === 1 ? '1 uso' : `${n} usos`);
const HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

function fecha(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return null;
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const p2 = (n) => String(n).padStart(2, '0');
  return `${d.getUTCDate()} ${meses[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())} UTC`;
}

// Hojas de tokens.json: nombre con puntos → { $type, $value, $extensions }
const hojas = new Map();
(function walk(node, path) {
  if (!node || typeof node !== 'object') return;
  if ('$value' in node) {
    hojas.set(path.join('.'), node);
    return;
  }
  for (const k of Object.keys(node)) if (!k.startsWith('$')) walk(node[k], path.concat(k));
})(dtcg, []);

function categoriaDesdeNombre(name, type) {
  if (type === 'color') return 'color';
  if (type === 'shadow') return 'shadow';
  if (type === 'fontFamily') return 'fontFamily';
  if (type === 'fontWeight') return 'fontWeight';
  if (name.startsWith('font.size')) return 'fontSize';
  if (name.startsWith('font.lineHeight')) return 'lineHeight';
  if (name.startsWith('font.letterSpacing')) return 'letterSpacing';
  if (name.startsWith('space')) return 'spacing';
  if (name.startsWith('radius')) return 'radius';
  return type || 'otros';
}

function dtcgColorCss(c) {
  if (!c || typeof c !== 'object') return null;
  const a = typeof c.alpha === 'number' ? c.alpha : 1;
  if (Array.isArray(c.components) && c.components.length === 3 && c.components.every((x) => typeof x === 'number')) {
    const [r, g, b] = c.components.map((x) => Math.round(Math.min(1, Math.max(0, x)) * 255));
    return `rgb(${r} ${g} ${b} / ${a})`;
  }
  return typeof c.hex === 'string' && HEX.test(c.hex) ? c.hex : null;
}
function dtcgValorTexto(leaf) {
  const v = leaf.$value;
  if (leaf.$type === 'color') return typeof v?.hex === 'string' ? v.hex : JSON.stringify(v);
  if (leaf.$type === 'dimension') return `${v?.value}${v?.unit ?? ''}`;
  if (leaf.$type === 'fontFamily') return Array.isArray(v) ? v.join(', ') : String(v);
  if (leaf.$type === 'shadow') return sombraCss(v) ?? JSON.stringify(v);
  return typeof v === 'object' ? JSON.stringify(v) : String(v);
}
function sombraCss(v) {
  const capas = Array.isArray(v) ? v : [v];
  const out = [];
  for (const c of capas) {
    if (!c || typeof c !== 'object') return null;
    const col = dtcgColorCss(c.color);
    const d = (x) => (x && typeof x.value === 'number' ? `${x.value}${x.unit === 'px' || !x.unit ? 'px' : ''}` : null);
    const partes = [d(c.offsetX), d(c.offsetY), d(c.blur), d(c.spread)];
    if (!col || partes.some((p) => p === null)) return null;
    out.push(`${c.inset ? 'inset ' : ''}${partes.join(' ')} ${col}`);
  }
  return out.length ? out.join(', ') : null;
}

// Lista unificada de tokens. report.json manda; tokens.json aporta el valor estructurado.
const tokens = [];
const vistos = new Set();
for (const t of report?.tokens ?? []) {
  if (!t || typeof t.name !== 'string') continue;
  vistos.add(t.name);
  tokens.push({
    name: t.name,
    category: t.category ?? 'otros',
    value: typeof t.value === 'string' ? t.value : JSON.stringify(t.value),
    count: typeof t.count === 'number' ? t.count : null,
    pages: Array.isArray(t.pages) ? t.pages : [],
    selectors: Array.isArray(t.selectors) ? t.selectors : [],
    vars: Array.isArray(t.matchingVariables) ? t.matchingVariables : [],
    clippedFrom: t.clippedFrom,
    leaf: hojas.get(t.name) ?? null,
    soloEn: hojas.has(t.name) ? null : 'report.json',
  });
}
for (const [name, leaf] of hojas) {
  if (vistos.has(name)) continue;
  const uso = leaf.$extensions?.['explorer.usage'] ?? {};
  tokens.push({
    name,
    category: categoriaDesdeNombre(name, leaf.$type),
    value: dtcgValorTexto(leaf),
    count: typeof uso.count === 'number' ? uso.count : null,
    pages: Array.isArray(uso.pages) ? uso.pages : [],
    selectors: [],
    vars: [],
    clippedFrom: undefined,
    leaf,
    soloEn: report ? 'tokens.json' : null,
  });
}

const px = (t) => {
  const v = t.leaf?.$value;
  if (t.leaf?.$type === 'dimension' && typeof v?.value === 'number') return v.value;
  const m = /^(-?\d+(?:\.\d+)?)px$/.exec(t.value);
  return m ? Number(m[1]) : null;
};
const porValor = (a, b) => {
  const x = px(a), y = px(b);
  if (x === null && y === null) return natural(a.name, b.name);
  if (x === null) return 1;
  if (y === null) return -1;
  return x - y || natural(a.name, b.name);
};
const cat = (c) => tokens.filter((t) => t.category === c);
const maxUso = (list) => Math.max(1, ...list.map((t) => t.count ?? 0));
const esBajo = (t) => t.count !== null && t.count <= BAJO_USO;

// ---------- piezas de HTML ----------

function uso(t, max) {
  if (t.count === null) return '<span class="uso"><span class="uso-n">usos: sin dato</span></span>';
  const w = Math.max(1, Math.round((t.count / max) * 100));
  const pag = t.pages.length ? ` · ${t.pages.length} pág.` : '';
  return `<span class="uso${esBajo(t) ? ' uso-bajo' : ''}" title="${e(usosTxt(t.count))} en ${t.pages.length} página(s). La barra es relativa al máximo de su grupo (${max}).">` +
    `<span class="uso-n">${e(usosTxt(t.count))}<span class="uso-p">${pag}</span></span>` +
    `<span class="uso-bar"><i style="width:${w}%"></i></span></span>`;
}
const copiar = (texto, etiqueta = texto, cls = '') =>
  `<button type="button" class="copiar ${cls}" data-copy="${e(texto)}" title="Copiar ${e(texto)}">${e(etiqueta)}</button>`;
const detalle = (t) =>
  `<button type="button" class="det" data-det="${e(t.name)}" title="Páginas y selectores de ${e(t.name)}" aria-label="Detalle de ${e(t.name)}">detalle</button>`;
const varsChips = (t) =>
  t.vars.length
    ? `<div class="vars">${t.vars.map((v) => copiar(v, v, 'chip')).join('')}</div>`
    : '';
const marcas = (t) =>
  (t.soloEn ? `<span class="marca" title="Este token solo aparece en ${e(t.soloEn)}">solo en ${e(t.soloEn)}</span>` : '') +
  (t.clippedFrom !== undefined ? `<span class="marca" title="clippedFrom">recortado desde ${e(typeof t.clippedFrom === 'string' ? t.clippedFrom : JSON.stringify(t.clippedFrom))}</span>` : '');
const attrs = (t, cls) => `class="${cls}${esBajo(t) ? ' bajo' : ''}" data-token="${e(t.name)}" data-cat="${e(t.category)}"`;
const vacio = (msg) => `<p class="vacio">${e(msg)}</p>`;
function resumen(list) {
  const bajos = list.filter(esBajo).length;
  return `<span class="cuenta">${list.length} ${list.length === 1 ? 'token' : 'tokens'}${bajos ? ` · <span class="cuenta-bajo">${bajos} con 1–${BAJO_USO} usos</span>` : ''}</span>`;
}

// --- color
function colorCss(t) {
  if (HEX.test(t.value)) return t.value;
  return t.leaf?.$type === 'color' ? dtcgColorCss(t.leaf.$value) : null;
}
function alfa(t) {
  const a = t.leaf?.$type === 'color' ? t.leaf.$value?.alpha : undefined;
  if (typeof a === 'number') return a;
  if (/^#[0-9a-f]{8}$/i.test(t.value)) return parseInt(t.value.slice(7), 16) / 255;
  return 1;
}
function colorCard(t, max, grande) {
  const css = colorCss(t);
  const a = alfa(t);
  return `<article ${attrs(t, `color${grande ? ' color-rol' : ''}`)}>
  <div class="muestra cuadros">${css ? `<span style="background:${e(css)}"></span>` : '<em>valor no representable</em>'}</div>
  <div class="cuerpo">
    <div class="nombre">${e(t.name)}</div>
    <div class="valor">${copiar(t.value)}${a < 1 ? `<span class="alfa" title="alpha ${a}">alfa ${num(Math.round(a * 1000) / 10)} %</span>` : ''}</div>
    ${uso(t, max)}
    ${varsChips(t)}
    <div class="pie">${marcas(t)}${detalle(t)}</div>
  </div>
</article>`;
}
function seccionColor() {
  const todos = cat('color');
  if (!todos.length) return vacio('El run no tiene tokens de color.');
  const max = maxUso(todos);
  const ordenRoles = ['color.surface', 'color.primary', 'color.text.primary', 'color.text.secondary'];
  const roles = todos
    .filter((t) => !t.name.startsWith('color.palette.'))
    .sort((a, b) => {
      const x = ordenRoles.indexOf(a.name), y = ordenRoles.indexOf(b.name);
      return (x === -1 ? 99 : x) - (y === -1 ? 99 : y) || natural(a.name, b.name);
    });
  const paleta = todos.filter((t) => t.name.startsWith('color.palette.')).sort((a, b) => natural(a.name, b.name));
  const faltan = ordenRoles.filter((r) => !roles.some((t) => t.name === r));
  return `<h3>Roles ${resumen(roles)}</h3>
${roles.length ? `<div class="rejilla roles">${roles.map((t) => colorCard(t, max, true)).join('\n')}</div>` : vacio('El run no asignó ningún rol de color.')}
${faltan.length ? `<p class="nota">Roles sin asignar en este run: ${faltan.map((f) => `<code>${e(f)}</code>`).join(', ')}.</p>` : ''}
<h3>Paleta ${resumen(paleta)}</h3>
<p class="nota">En el orden en que el run los nombró (<code>color.palette.N</code>).</p>
${paleta.length ? `<div class="rejilla paleta">${paleta.map((t) => colorCard(t, max, false)).join('\n')}</div>` : vacio('El run no tiene colores de paleta.')}`;
}

// --- tipografía
const GENERICAS = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'math', 'emoji', 'fangsong']);
function pila(t) {
  const v = t?.leaf?.$value;
  if (Array.isArray(v)) return v.map(String);
  return t ? t.value.split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean) : [];
}
const pilaCss = (lista) =>
  lista
    .filter((f) => /^[\w .\-]+$/.test(f))
    .map((f) => (GENERICAS.has(f.toLowerCase()) || f.startsWith('-') ? f : `"${f}"`))
    .join(', ');
const FRASE = 'El veloz murciélago hindú comía feliz cardillo y kiwi';

function seccionTipografia() {
  const familias = cat('fontFamily').sort((a, b) => (b.count ?? 0) - (a.count ?? 0) || natural(a.name, b.name));
  const tamanos = cat('fontSize').sort(porValor);
  const pesos = cat('fontWeight').sort((a, b) => natural(a.name, b.name));
  const interlineados = cat('lineHeight').sort(porValor);
  const tracking = cat('letterSpacing').sort(porValor);
  const cuerpo = familias.find((t) => t.name === 'font.family.body') ?? familias[0];
  const pilaCuerpo = cuerpo ? pilaCss(pila(cuerpo)) : '';
  const estiloCuerpo = pilaCuerpo ? `font-family:${e(pilaCuerpo)};` : '';

  const maxF = maxUso(familias);
  const htmlFamilias = familias.length
    ? `<div class="familias">${familias
        .map((t) => {
          const p = pila(t);
          const css = pilaCss(p);
          return `<article ${attrs(t, 'familia')}>
  <div class="familia-muestra" style="${css ? `font-family:${e(css)}` : ''}">${e(p[0] ?? t.value)} <span>AaBbCc 0123 áéñ</span></div>
  <div class="nombre">${e(t.name)}</div>
  <div class="pila">${copiar(t.value, p.join(', '))}</div>
  ${uso(t, maxF)}
  <div class="pie">${marcas(t)}${detalle(t)}</div>
</article>`;
        })
        .join('\n')}</div>
<p class="nota">La muestra usa la primera fuente de la pila que esté instalada en este equipo: la vista no descarga fuentes.</p>`
    : vacio('El run no tiene familias tipográficas.');

  const maxT = maxUso(tamanos);
  const htmlTamanos = tamanos.length
    ? `<div class="tamanos">${tamanos
        .map((t) => {
          const v = px(t);
          return `<div ${attrs(t, 'tamano')}>
  <div class="tamano-meta"><span class="nombre">${e(t.name)}</span>${copiar(t.value)}${marcas(t)}</div>
  <div class="tamano-muestra" style="${estiloCuerpo}${v !== null && v > 0 ? `font-size:${v}px` : ''}">${e(FRASE)}</div>
  <div class="tamano-uso">${uso(t, maxT)}${detalle(t)}</div>
</div>`;
        })
        .join('\n')}</div>
<p class="nota">Muestras a tamaño real${cuerpo ? `, con la pila de <code>${e(cuerpo.name)}</code>` : ''}.</p>`
    : vacio('El run no tiene tamaños de fuente.');

  const tabla = (titulo, list, celda) => {
    if (!list.length) return `<div class="bloque"><h3>${titulo}</h3>${vacio('Sin tokens de este tipo en el run.')}</div>`;
    const max = maxUso(list);
    return `<div class="bloque"><h3>${titulo} ${resumen(list)}</h3>
<table class="compacta"><thead><tr><th>Token</th><th>Valor</th><th>Usos</th><th><span class="sr">Detalle</span></th></tr></thead><tbody>
${list
  .map(
    (t) => `<tr ${attrs(t, 'fila')}><td class="nombre">${e(t.name)}${marcas(t)}${varsChips(t)}</td><td>${celda ? celda(t) : copiar(t.value)}</td><td>${uso(t, max)}</td><td>${detalle(t)}</td></tr>`,
  )
  .join('\n')}
</tbody></table></div>`;
  };
  const celdaPeso = (t) => {
    const w = Number(t.leaf?.$value ?? t.value);
    return `<span style="${estiloCuerpo}${Number.isFinite(w) ? `font-weight:${w}` : ''}">${copiar(t.value)}</span>`;
  };

  return `<h3>Familias ${resumen(familias)}</h3>
${htmlFamilias}
<h3>Tamaños ${resumen(tamanos)}</h3>
${htmlTamanos}
<div class="tablas">
${tabla('Pesos', pesos, celdaPeso)}
${tabla('Interlineados', interlineados)}
${tabla('Letter-spacing', tracking)}
</div>`;
}

// --- espaciado
function seccionEspaciado() {
  const list = cat('spacing').sort(porValor);
  if (!list.length) return vacio('El run no tiene tokens de espaciado.');
  const max = maxUso(list);
  return `<p class="nota">${resumen(list)} · Cada barra mide exactamente su valor en píxeles. Las barras huecas son valores con 1–${BAJO_USO} usos.</p>
<div class="espacios">${list
    .map((t) => {
      const v = px(t);
      return `<div ${attrs(t, 'esp')}>
  <div class="esp-meta"><span class="nombre">${e(t.name)}</span>${copiar(t.value)}${marcas(t)}${varsChips(t)}</div>
  <div class="esp-pista">${v !== null && v > 0 ? `<i style="width:${v}px"></i>` : '<em>sin medida en px</em>'}</div>
  <div class="esp-uso">${uso(t, max)}${detalle(t)}</div>
</div>`;
    })
    .join('\n')}</div>`;
}

// --- radios
function seccionRadios() {
  const list = cat('radius').sort(porValor);
  if (!list.length) return vacio('El run no tiene tokens de radio.');
  const max = maxUso(list);
  return `<p class="nota">${resumen(list)}</p>
<div class="rejilla radios">${list
    .map((t) => {
      const v = px(t) ?? (t.value === 'full' ? 9999 : null);
      const real = t.leaf?.$type === 'dimension' && `${v}px` !== t.value ? ` <span class="alfa">${e(`${v}px`)}</span>` : '';
      return `<article ${attrs(t, 'radio')}>
  <div class="radio-caja">${v !== null ? `<span style="border-radius:${v}px"></span>` : '<em>sin medida</em>'}</div>
  <div class="nombre">${e(t.name)}</div>
  <div class="valor">${copiar(t.value)}${real}</div>
  ${uso(t, max)}
  ${varsChips(t)}
  <div class="pie">${marcas(t)}${detalle(t)}</div>
</article>`;
    })
    .join('\n')}</div>`;
}

// --- sombras
function seccionSombras() {
  const list = cat('shadow').sort((a, b) => natural(a.name, b.name));
  if (!list.length) return vacio('El run no tiene tokens de sombra.');
  const max = maxUso(list);
  return `<p class="nota">${resumen(list)} · Las sombras se muestran siempre sobre un fondo claro, también en modo oscuro, para que se vean como en el sitio.</p>
<div class="rejilla sombras">${list
    .map((t) => {
      const v = t.leaf?.$type === 'shadow' ? t.leaf.$value : null;
      const css = (v && sombraCss(v)) || (/^[#\w\s.,()%-]+$/.test(t.value) && !/url/i.test(t.value) ? t.value : null);
      const capas = Array.isArray(v) ? v.length : t.value.split(/,(?![^(]*\))/).length;
      return `<article ${attrs(t, 'sombra')}>
  <div class="sombra-escena">${css ? `<span style="box-shadow:${e(css)}"></span>` : '<em>valor no representable</em>'}</div>
  <div class="cuerpo">
    <div class="nombre">${e(t.name)} <span class="alfa">${capas} ${capas === 1 ? 'capa' : 'capas'}</span></div>
    <div class="valor">${copiar(t.value, t.value, 'largo')}</div>
    ${uso(t, max)}
    ${varsChips(t)}
    <div class="pie">${marcas(t)}${detalle(t)}</div>
  </div>
</article>`;
    })
    .join('\n')}</div>`;
}

// --- casi duplicados
function seccionDuplicados() {
  if (!report) return vacio('Falta report.json: no hay datos de casi duplicados.');
  const dups = report.nearDuplicates;
  if (!Array.isArray(dups)) return vacio('report.json no trae nearDuplicates.');
  if (!dups.length) return vacio('El run no encontró colores casi duplicados.');
  const porHex = new Map(cat('color').map((t) => [t.value.toLowerCase(), t]));
  const lado = (hex) => {
    const h = String(hex);
    const t = porHex.get(h.toLowerCase());
    return `<div class="dup-lado">
  <div class="dup-muestra cuadros">${HEX.test(h) ? `<span style="background:${e(h)}"></span>` : ''}</div>
  ${copiar(h)}
  <div class="dup-token">${t ? `${e(t.name)} · ${t.count === null ? 'usos: sin dato' : e(usosTxt(t.count))}` : 'sin token con este valor'}</div>
</div>`;
  };
  return `<p class="nota">${dups.length} ${dups.length === 1 ? 'par' : 'pares'}. El run no fusiona estos colores: solo los señala (deltaE 2000 menor que 2).</p>
<div class="rejilla dups">${dups
    .map(
      (d) => `<article class="dup" data-dup>
  <div class="dup-par">${lado(d.a)}${lado(d.b)}</div>
  <div class="dup-delta">deltaE <strong>${e(typeof d.deltaE === 'number' ? num(d.deltaE) : d.deltaE ?? 'sin dato')}</strong></div>
</article>`,
    )
    .join('\n')}</div>`;
}

// --- páginas
const pages = Array.isArray(pagesRaw) ? pagesRaw : Array.isArray(pagesRaw?.pages) ? pagesRaw.pages : [];
const fallo = (p) => Boolean(p.error) || (typeof p.status === 'number' && p.status >= 400);
const capturaOk = (f) => typeof f === 'string' && /^[\w.-]+\.png$/i.test(f) && f === basename(f);
const capturasCopiadas = new Set();

function seccionPaginas() {
  if (!pagesRaw) return vacio('Falta pages.json: no hay datos de las páginas recorridas.');
  if (!pages.length) return vacio('pages.json no lista ninguna página.');
  return `<div class="rejilla paginas">${pages
    .map((p) => {
      const mal = fallo(p);
      const tiene = capturaOk(p.screenshot) && capturasCopiadas.has(p.screenshot);
      const img = tiene
        ? `<a class="captura" href="screenshots/${e(p.screenshot)}" data-titulo="${e(p.title || p.url)}" title="Ver la captura completa"><img src="screenshots/${e(p.screenshot)}" alt="Captura de ${e(p.url)}" loading="lazy"></a>`
        : `<div class="captura sin">${p.screenshot ? `No se encontró ${e(p.screenshot)}` : 'Sin captura'}</div>`;
      const estado = typeof p.status === 'number' ? `HTTP ${p.status}` : 'sin respuesta';
      return `<article class="pagina${mal ? ' pagina-error' : ''}" data-pagina>
  ${img}
  <div class="cuerpo">
    <div class="pagina-titulo">${p.title ? e(p.title) : '<em>sin título</em>'}</div>
    <div class="pagina-url">${copiar(p.url, p.url, 'largo')}</div>
    <div><span class="estado${mal ? ' estado-mal' : ''}">${e(estado)}</span></div>
    ${p.error ? `<div class="error"><strong>Error:</strong> ${e(p.error)}</div>` : ''}
  </div>
</article>`;
    })
    .join('\n')}</div>`;
}

// --- variables CSS
function seccionVariables() {
  if (!report) return vacio('Falta report.json: no hay variables CSS.');
  const vars = report.cssVariables;
  if (!Array.isArray(vars)) return vacio('report.json no trae cssVariables.');
  if (!vars.length) return vacio('El sitio no declara variables CSS en :root (o el run no encontró ninguna).');
  const nombres = new Set(vars.map((v) => v.name)).size;
  const esColor = (v) => /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\s.,%/]+\))$/i.test(v.trim());
  return `<details class="plegable"><summary>Mostrar las ${vars.length} variables${nombres !== vars.length ? ` (${nombres} nombres distintos)` : ''}</summary>
<table class="vars-tabla"><thead><tr><th>Variable</th><th>Valor</th><th>Páginas</th></tr></thead><tbody>
${vars
  .map((v) => {
    const val = String(v.value ?? '');
    const pg = Array.isArray(v.pages) ? v.pages : [];
    return `<tr data-var><td>${copiar(v.name, v.name, 'largo')}</td><td>${esColor(val) ? `<span class="mini cuadros"><i style="background:${e(val.trim())}"></i></span>` : ''}${copiar(val, val, 'largo')}</td><td title="${e(pg.join('\n'))}">${pg.length}</td></tr>`;
  })
  .join('\n')}
</tbody></table></details>`;
}

// --- otros (categorías que esta vista no conoce)
const CONOCIDAS = new Set(['color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'spacing', 'radius', 'shadow']);
function seccionOtros() {
  const list = tokens.filter((t) => !CONOCIDAS.has(t.category)).sort((a, b) => natural(a.name, b.name));
  if (!list.length) return '';
  const max = maxUso(list);
  return `<section id="otros"><h2>Otros tokens</h2>
<p class="nota">${resumen(list)} · Categorías que esta vista no sabe dibujar.</p>
<table class="compacta"><thead><tr><th>Token</th><th>Categoría</th><th>Valor</th><th>Usos</th><th></th></tr></thead><tbody>
${list.map((t) => `<tr ${attrs(t, 'fila')}><td class="nombre">${e(t.name)}${marcas(t)}</td><td>${e(t.category)}</td><td>${copiar(t.value, t.value, 'largo')}</td><td>${uso(t, max)}</td><td>${detalle(t)}</td></tr>`).join('\n')}
</tbody></table></section>`;
}

// ---------- capturas ----------

mkdirSync(outDir, { recursive: true });
const shotsOut = join(outDir, 'screenshots');
const shotsIn = join(runDir, 'screenshots');
if (existsSync(shotsOut)) for (const f of readdirSync(shotsOut)) if (/\.png$/i.test(f)) rmSync(join(shotsOut, f));
mkdirSync(shotsOut, { recursive: true });
if (existsSync(shotsIn)) {
  for (const f of readdirSync(shotsIn)) {
    if (!capturaOk(f)) continue;
    copyFileSync(join(shotsIn, f), join(shotsOut, f));
    capturasCopiadas.add(f);
  }
} else {
  avisos.push('El run no tiene carpeta screenshots/.');
}

// ---------- cabecera ----------

const sitio = run?.params?.url ?? pages[0]?.url ?? null;
let host = sitio;
try {
  host = new URL(sitio).host;
} catch {}
const conError = pages.filter(fallo).length;
const baseUnit = report ? report.baseUnit : undefined;
const inicio = run?.startedAt ?? run?.createdAt;
const dur = run?.startedAt && run?.finishedAt ? (new Date(run.finishedAt) - new Date(run.startedAt)) / 1000 : null;
const bajosTotal = tokens.filter(esBajo).length;
const soloReport = tokens.filter((t) => t.soloEn === 'report.json');
const soloTokens = tokens.filter((t) => t.soloEn === 'tokens.json');
if (report && dtcg && soloReport.length)
  avisos.push(`${soloReport.length} token(s) están en report.json pero no en tokens.json: ${soloReport.map((t) => t.name).join(', ')}.`);
if (soloTokens.length)
  avisos.push(`${soloTokens.length} token(s) están en tokens.json pero no en report.json: ${soloTokens.map((t) => t.name).join(', ')}.`);
if (run?.status && run.status !== 'done') avisos.push(`El run no está terminado: su estado es "${run.status}".`);

const dato = (k, v, sub = '') => `<div class="dato"><dt>${k}</dt><dd>${v}${sub ? `<small>${sub}</small>` : ''}</dd></div>`;
const cabecera = `<header id="resumen">
<p class="antetitulo">Explorador de estilos web · vista de prueba</p>
<h1>${sitio ? e(host) : 'Sitio sin dato'}</h1>
<dl class="datos">
${dato('Sitio analizado', sitio ? copiar(sitio, sitio, 'largo') : 'sin dato (falta run.json)')}
${dato('Fecha del run', e(fecha(inicio) ?? 'sin dato'), [dur !== null && Number.isFinite(dur) ? `duró ${num(Math.round(dur * 10) / 10)} s` : '', run?.id ? `run ${e(run.id)}` : '', run?.status ? `estado: ${e(run.status)}` : ''].filter(Boolean).join(' · '))}
${dato('Páginas recorridas', pagesRaw ? String(pages.length) : 'sin dato', pagesRaw ? `<span class="${conError ? 'txt-mal' : ''}">${conError} con error</span>${run?.params?.maxPages !== undefined ? ` · límite maxPages ${e(run.params.maxPages)}` : ''}${run?.params?.maxDepth !== undefined ? ` · maxDepth ${e(run.params.maxDepth)}` : ''}` : '')}
${dato('Tokens', `<span id="total-tokens">${tokens.length}</span>`, `<span class="cuenta-bajo">${bajosTotal} con 1–${BAJO_USO} usos</span>`)}
${dato('baseUnit', baseUnit === undefined ? 'sin dato' : baseUnit === null ? 'no detectada' : `${e(baseUnit)} px`, baseUnit === null ? 'report.json trae <code>baseUnit: null</code>' : '')}
</dl>
${avisos.length ? `<ul class="avisos">${avisos.map((a) => `<li>${e(a)}</li>`).join('')}</ul>` : ''}
<p class="leyenda"><span class="uso"><span class="uso-n">120 usos</span><span class="uso-bar"><i style="width:70%"></i></span></span> valor con uso real
<span class="uso uso-bajo"><span class="uso-n">1 uso</span><span class="uso-bar"><i style="width:2%"></i></span></span> valor con 1–${BAJO_USO} usos, probablemente accidental (borde discontinuo)</p>
</header>`;

// ---------- documento ----------

const nCat = (...cs) => tokens.filter((t) => cs.includes(t.category)).length;
const secciones = [
  ['color', 'Color', nCat('color'), seccionColor()],
  ['tipografia', 'Tipografía', nCat('fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'), seccionTipografia()],
  ['espaciado', 'Espaciado', nCat('spacing'), seccionEspaciado()],
  ['radios', 'Radios', nCat('radius'), seccionRadios()],
  ['sombras', 'Sombras', nCat('shadow'), seccionSombras()],
  ['duplicados', 'Casi duplicados', Array.isArray(report?.nearDuplicates) ? report.nearDuplicates.length : null, seccionDuplicados()],
  ['paginas', 'Páginas', pagesRaw ? pages.length : null, seccionPaginas()],
  ['variables', 'Variables CSS', Array.isArray(report?.cssVariables) ? report.cssVariables.length : null, seccionVariables()],
];
const otros = seccionOtros();

const datosDetalle = Object.fromEntries(
  tokens.map((t) => [t.name, { c: t.category, v: t.value, n: t.count, p: t.pages, s: t.selectors, m: t.vars, k: t.clippedFrom, o: t.soloEn ?? undefined }]),
);
const jsonSeguro = JSON.stringify(datosDetalle).replace(/[<\u2028\u2029]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

const CSS = String.raw`
:root{
  --fondo:#f4f4f2;--panel:#ffffff;--panel2:#ececea;--linea:#d9d9d5;--linea2:#bdbdb8;
  --tinta:#1c1c1a;--tinta2:#5c5c57;--tinta3:#8a8a84;--barra:#3a3a37;
  --aviso:#8a5a00;--aviso-fondo:#fff4d6;--aviso-linea:#d9a521;--mal:#a3271f;--mal-fondo:#fdeceb;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color-scheme:light dark;
}
@media (prefers-color-scheme:dark){:root{
  --fondo:#161615;--panel:#20201f;--panel2:#2a2a28;--linea:#383835;--linea2:#55554f;
  --tinta:#ecece8;--tinta2:#aeaea7;--tinta3:#85857e;--barra:#c9c9c2;
  --aviso:#f0c35a;--aviso-fondo:#3a2f10;--aviso-linea:#a37a12;--mal:#ff9d94;--mal-fondo:#3d1b18;
}}
*{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--fondo);color:var(--tinta);font:14px/1.45 var(--sans);overflow-wrap:anywhere}
code,.nombre,.copiar,.det{font-family:var(--mono)}
code{font-size:.92em;background:var(--panel2);padding:1px 4px;border-radius:3px}
em{color:var(--tinta3);font-size:12px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}

nav{position:sticky;top:0;z-index:10;background:var(--panel);border-bottom:1px solid var(--linea);display:flex;align-items:center;gap:12px;padding:0 16px;height:44px}
nav .marca-nav{font-weight:600;white-space:nowrap;font-size:13px}
nav .enlaces{display:flex;gap:2px;overflow-x:auto;flex:1;min-width:0;scrollbar-width:none}
nav .enlaces::-webkit-scrollbar{display:none}
nav a{color:var(--tinta2);text-decoration:none;white-space:nowrap;padding:6px 9px;border-radius:5px;font-size:13px}
nav a:hover{background:var(--panel2);color:var(--tinta)}
nav a.activo{background:var(--tinta);color:var(--panel)}
nav a b{font-weight:400;opacity:.65;margin-left:4px;font-size:11px}
nav label{white-space:nowrap;font-size:12px;color:var(--tinta2);display:flex;align-items:center;gap:5px;cursor:pointer}

main{max-width:1360px;margin:0 auto;padding:0 24px 80px}
header{padding:28px 0 8px}
.antetitulo{margin:0;color:var(--tinta3);font-size:12px;text-transform:uppercase;letter-spacing:.06em}
h1{margin:4px 0 18px;font-size:28px;line-height:1.15;font-weight:650}
h2{font-size:20px;margin:0 0 14px;padding-top:6px;font-weight:650}
h3{font-size:14px;margin:26px 0 10px;font-weight:650;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
section{padding:30px 0 10px;border-top:1px solid var(--linea);margin-top:26px;scroll-margin-top:44px}
header{scroll-margin-top:44px}
.cuenta{font-weight:400;font-size:12px;color:var(--tinta3)}
.cuenta-bajo,.txt-mal{color:var(--aviso)}
.txt-mal{color:var(--mal)}
.nota{color:var(--tinta2);font-size:12.5px;margin:8px 0 12px}
.vacio{border:1px dashed var(--linea2);border-radius:8px;padding:16px;color:var(--tinta2);background:var(--panel)}

.datos{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:0}
.dato{background:var(--panel);border:1px solid var(--linea);border-radius:8px;padding:10px 12px;min-width:0}
.dato dt{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--tinta3)}
.dato dd{margin:3px 0 0;font-size:18px;font-weight:600}
.dato dd small{display:block;font-size:12px;font-weight:400;color:var(--tinta2);margin-top:2px}
.dato dd .copiar{font-size:13px;font-weight:500}
.avisos{margin:12px 0 0;padding:10px 12px 10px 28px;background:var(--aviso-fondo);border:1px solid var(--aviso-linea);border-radius:8px;color:var(--aviso);font-size:12.5px}
.leyenda{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;color:var(--tinta2);font-size:12.5px;margin:14px 0 0}
.leyenda .uso{width:110px;flex:none}

.copiar{appearance:none;border:1px solid transparent;background:transparent;color:inherit;font-size:12.5px;padding:1px 4px;margin:0 0 0 -4px;border-radius:4px;cursor:copy;text-align:left;max-width:100%;overflow-wrap:anywhere}
.copiar:hover{background:var(--panel2);border-color:var(--linea)}
.copiar.ok{background:var(--tinta);color:var(--panel)}
.copiar.largo{font-size:12px;color:var(--tinta2)}
.copiar.chip{margin:0;border-color:var(--linea);background:var(--panel2);font-size:11px;padding:0 5px;color:var(--tinta2)}
.vars{display:flex;flex-wrap:wrap;gap:3px;margin-top:6px}
.det{appearance:none;border:0;background:none;color:var(--tinta3);font-size:11px;padding:2px 0;cursor:pointer;text-decoration:underline dotted;margin-left:auto}
.det{white-space:nowrap;overflow-wrap:normal}
.det:hover{color:var(--tinta)}
.copiar:not(.largo):not(.chip){overflow-wrap:normal}
.pila .copiar{overflow-wrap:anywhere!important}
.pie{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px}
.marca{font-size:10.5px;border:1px solid var(--aviso-linea);color:var(--aviso);border-radius:3px;padding:0 4px;font-family:var(--sans);font-weight:400;margin-left:4px}
.alfa{font-size:11px;color:var(--tinta3);margin-left:6px;font-family:var(--sans);font-weight:400}
.nombre{font-size:12.5px;font-weight:600}
.valor{margin-top:1px}

.uso{display:block;min-width:0;margin-top:6px}
.uso-n{display:block;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
.uso-n{white-space:nowrap}
.uso-p{font-weight:400;color:var(--tinta3)}
.uso-bar{display:block;height:4px;background:var(--panel2);border-radius:2px;margin-top:3px;overflow:hidden}
.uso-bar i{display:block;height:100%;background:var(--barra);border-radius:2px}
.uso-bajo .uso-n{display:inline-block;color:var(--aviso);background:var(--aviso-fondo);border:1px dashed var(--aviso-linea);border-radius:4px;padding:0 5px}
.uso-bajo .uso-p{color:inherit}
.uso-bajo .uso-bar i{background:var(--aviso-linea)}
body.sin-bajos .bajo{display:none}

.rejilla{display:grid;gap:12px}
.roles{grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}
.paleta{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}
.radios{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}
.sombras{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.dups{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
.paginas{grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}
article{background:var(--panel);border:1px solid var(--linea);border-radius:8px;overflow:hidden;min-width:0}
article.bajo{border-style:dashed;border-color:var(--aviso-linea)}
.cuerpo{padding:10px 12px 8px}

.cuadros{background-color:#fff;background-image:conic-gradient(#d4d4d4 25%,#fff 0 50%,#d4d4d4 0 75%,#fff 0);background-size:14px 14px}
.muestra{height:64px;border-bottom:1px solid var(--linea)}
.color-rol .muestra{height:104px}
.muestra span,.dup-muestra span{display:block;width:100%;height:100%}
.muestra em{display:grid;place-items:center;height:100%}

.familias{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.familia{padding:12px}
.familia-muestra{font-size:26px;line-height:1.2;margin-bottom:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.familia-muestra span{color:var(--tinta3);font-size:18px}
.pila .copiar{color:var(--tinta2);font-size:12px}
.tamanos{background:var(--panel);border:1px solid var(--linea);border-radius:8px}
.tamano{display:grid;grid-template-columns:210px minmax(0,1fr) 170px;gap:14px;align-items:center;padding:7px 12px;border-bottom:1px solid var(--linea)}
.tamano:last-child{border-bottom:0}
.tamano.bajo{background:repeating-linear-gradient(135deg,transparent 0 8px,color-mix(in srgb,var(--aviso-fondo) 55%,transparent) 8px 16px)}
.tamano-meta{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.tamano-muestra{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25}
.tamano-uso,.esp-uso{display:flex;align-items:flex-end;gap:10px}
.tamano-uso .uso,.esp-uso .uso{flex:1;margin-top:0}
.tablas{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;align-items:start}
table{border-collapse:collapse;width:100%;background:var(--panel);border:1px solid var(--linea);border-radius:8px;font-size:12.5px}
th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--tinta3);font-weight:500;padding:6px 8px;border-bottom:1px solid var(--linea)}
td{padding:4px 8px;border-bottom:1px solid var(--linea);vertical-align:middle}
tr:last-child td{border-bottom:0}
.compacta td:nth-child(3){width:26%}
.compacta td,.compacta th{padding-left:6px;padding-right:6px}
@media (min-width:721px){.compacta td.nombre{white-space:nowrap}}
.compacta td:nth-child(2),.compacta td:nth-child(4),.compacta th{white-space:nowrap}
.compacta td:nth-child(4){width:1%;text-align:right}
.bloque{min-width:0;overflow-x:auto}
.tablas .uso-p{display:none}
.fila .marca{display:table;margin:2px 0 0}
.compacta .uso{margin-top:0}
.compacta .uso-bar{margin-top:2px}
tr.bajo td{background:color-mix(in srgb,var(--aviso-fondo) 45%,transparent)}

.espacios{background:var(--panel);border:1px solid var(--linea);border-radius:8px}
.esp{display:grid;grid-template-columns:190px minmax(0,1fr) 170px;gap:14px;align-items:center;padding:5px 12px;border-bottom:1px solid var(--linea)}
.esp:last-child{border-bottom:0}
.esp-meta{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.esp-pista{overflow-x:auto;min-width:0;padding:2px 0}
.esp-pista i{display:block;height:14px;background:var(--barra);border-radius:1px}
.esp.bajo .esp-pista i{background:transparent;border:1.5px dashed var(--aviso-linea)}

.radio{padding:12px}
.radio-caja{height:84px;display:grid;place-items:center;margin-bottom:8px}
.radio-caja span{display:block;width:112px;max-width:100%;height:72px;background:var(--panel2);border:2px solid var(--barra)}

.sombra-escena{background:#f1f1ef;height:150px;display:grid;place-items:center;border-bottom:1px solid var(--linea)}
.sombra-escena span{display:block;width:55%;height:70px;background:#fff;border-radius:10px}

.dup-par{display:grid;grid-template-columns:1fr 1fr}
.dup-lado{padding:0 12px 10px;min-width:0}
.dup-muestra{height:88px;margin:0 -12px 8px}
.dup-token{font-size:12px;color:var(--tinta2)}
.dup-delta{border-top:1px solid var(--linea);padding:7px 12px;font-size:12.5px;color:var(--tinta2)}
.dup-delta strong{color:var(--tinta);font-size:15px;font-variant-numeric:tabular-nums}

.captura{display:block;height:170px;overflow:hidden;border-bottom:1px solid var(--linea);background:var(--panel2);cursor:zoom-in}
.captura img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.captura.sin{display:grid;place-items:center;color:var(--tinta3);cursor:default;background:repeating-linear-gradient(135deg,var(--panel2) 0 10px,var(--panel) 10px 20px)}
.pagina-titulo{font-weight:600}
.pagina-error{border-color:var(--mal)}
.estado{display:inline-block;font-size:11.5px;border:1px solid var(--linea2);border-radius:4px;padding:0 6px;margin-top:6px;color:var(--tinta2)}
.estado-mal{border-color:var(--mal);color:var(--mal);background:var(--mal-fondo)}
.error{margin-top:6px;font-size:12.5px;color:var(--mal);background:var(--mal-fondo);border-radius:5px;padding:5px 8px;font-family:var(--mono)}

.plegable summary{cursor:pointer;padding:10px 12px;background:var(--panel);border:1px solid var(--linea);border-radius:8px;font-weight:600}
.plegable[open] summary{margin-bottom:10px}
.vars-tabla td:first-child{white-space:nowrap}
.vars-tabla td:last-child{text-align:right;color:var(--tinta2);width:70px}
.vars-tabla .copiar{white-space:pre-wrap}
.mini{display:inline-block;width:14px;height:14px;border-radius:3px;border:1px solid var(--linea2);vertical-align:-3px;margin-right:8px;overflow:hidden;background-size:8px 8px}
.mini i{display:block;width:100%;height:100%}

dialog{border:1px solid var(--linea2);border-radius:10px;background:var(--panel);color:var(--tinta);padding:0;max-width:min(720px,calc(100vw - 24px));width:100%;max-height:calc(100vh - 24px)}
dialog::backdrop{background:rgba(0,0,0,.55)}
.dlg-cab{display:flex;gap:10px;align-items:center;padding:10px 14px;border-bottom:1px solid var(--linea);position:sticky;top:0;background:var(--panel)}
.dlg-cab strong{flex:1;min-width:0;font-family:var(--mono);font-size:13px}
.dlg-cab button{appearance:none;border:1px solid var(--linea2);background:var(--panel2);color:var(--tinta);border-radius:5px;padding:3px 10px;cursor:pointer;font:inherit}
.dlg-cuerpo{padding:12px 14px 16px}
.dlg-cuerpo h4{margin:14px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--tinta3);font-weight:500}
.dlg-cuerpo ul{margin:0;padding-left:18px}
.dlg-cuerpo li{font-family:var(--mono);font-size:12px;margin:2px 0}
#visor{max-width:min(1464px,calc(100vw - 24px))}
#visor img{display:block;width:100%;height:auto}
#aviso-copia{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:var(--tinta);color:var(--panel);padding:6px 14px;border-radius:6px;font-size:12.5px;opacity:0;pointer-events:none;transition:opacity .15s;z-index:30;max-width:calc(100vw - 32px)}
#aviso-copia.ver{opacity:1}

@media (max-width:1240px){.tablas{grid-template-columns:1fr}}
@media (max-width:720px){
  main{padding:0 16px 60px}
  nav{padding:0 10px;gap:8px}
  nav .marca-nav{display:none}
  h1{font-size:22px}
  .tamano,.esp{grid-template-columns:minmax(0,1fr) 176px;gap:4px 10px}
  .tamano-muestra,.esp-pista{grid-column:1/-1;grid-row:2}
  .paleta{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
  .vars-tabla td:first-child{white-space:normal}
  .vars-tabla thead{display:none}
  .vars-tabla tr{display:block;padding:6px 8px;border-bottom:1px solid var(--linea)}
  .vars-tabla td{display:block;border:0;padding:1px 0;width:auto!important;text-align:left!important}
  .vars-tabla td:last-child::before{content:"páginas: "}
}
@media print{nav,.det{display:none}}
`;

const JS = String.raw`
(function(){
  var datos = JSON.parse(document.getElementById('datos').textContent);
  var aviso = document.getElementById('aviso-copia'), tAviso;
  function avisar(txt){aviso.textContent = txt; aviso.classList.add('ver'); clearTimeout(tAviso); tAviso = setTimeout(function(){aviso.classList.remove('ver')}, 1400);}
  function copiar(txt, btn){
    function ok(){btn.classList.add('ok'); setTimeout(function(){btn.classList.remove('ok')}, 700); avisar('Copiado: ' + (txt.length > 60 ? txt.slice(0, 60) + '…' : txt));}
    function plan_b(){
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      (btn.closest('dialog') || document.body).appendChild(ta); ta.select();
      var bien = false; try { bien = document.execCommand('copy'); } catch (e) {}
      ta.remove(); bien ? ok() : avisar('No se pudo copiar');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, plan_b); else plan_b();
  }
  function el(tag, txt){var n = document.createElement(tag); if (txt !== undefined) n.textContent = txt; return n;}
  var dlg = document.getElementById('detalle'), visor = document.getElementById('visor');
  function lista(cuerpo, titulo, items, vacio){
    cuerpo.appendChild(el('h4', titulo));
    if (!items || !items.length){ cuerpo.appendChild(el('em', vacio)); return; }
    var ul = el('ul'); items.forEach(function(i){ ul.appendChild(el('li', i)); }); cuerpo.appendChild(ul);
  }
  function abrirDetalle(nombre){
    var d = datos[nombre]; if (!d) return;
    dlg.querySelector('strong').textContent = nombre;
    var c = dlg.querySelector('.dlg-cuerpo'); c.textContent = '';
    c.appendChild(el('h4', 'Valor'));
    var b = el('button', d.v); b.type = 'button'; b.className = 'copiar'; b.setAttribute('data-copy', d.v); c.appendChild(b);
    c.appendChild(el('h4', 'Uso'));
    c.appendChild(el('div', (d.n === null ? 'sin dato' : d.n + (d.n === 1 ? ' uso' : ' usos')) + ' · categoría ' + d.c + (d.o ? ' · solo en ' + d.o : '')));
    if (d.k !== undefined){ c.appendChild(el('h4', 'Recortado desde (clippedFrom)')); c.appendChild(el('div', typeof d.k === 'string' ? d.k : JSON.stringify(d.k))); }
    lista(c, 'Páginas (' + d.p.length + ')', d.p, 'Sin páginas registradas.');
    lista(c, 'Selectores de ejemplo (' + d.s.length + ', el informe guarda hasta 5)', d.s, 'Sin selectores registrados.');
    lista(c, 'Variables CSS que coinciden (' + d.m.length + ')', d.m, 'Ninguna.');
    dlg.showModal();
  }
  document.addEventListener('click', function(ev){
    var t = ev.target.closest('[data-copy]');
    if (t){ copiar(t.getAttribute('data-copy'), t); return; }
    t = ev.target.closest('[data-det]');
    if (t){ abrirDetalle(t.getAttribute('data-det')); return; }
    t = ev.target.closest('a.captura');
    if (t){
      ev.preventDefault();
      visor.querySelector('strong').textContent = t.getAttribute('data-titulo');
      visor.querySelector('img').src = t.getAttribute('href');
      visor.showModal(); return;
    }
    t = ev.target.closest('[data-cerrar]');
    if (t){ t.closest('dialog').close(); return; }
    if (ev.target.tagName === 'DIALOG') ev.target.close();
  });
  var chk = document.getElementById('ocultar-bajos');
  chk.addEventListener('change', function(){ document.body.classList.toggle('sin-bajos', chk.checked); });
  var enlaces = {};
  document.querySelectorAll('nav .enlaces a').forEach(function(a){ enlaces[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(x){
        if (!x.isIntersecting) return;
        Object.keys(enlaces).forEach(function(k){ enlaces[k].classList.toggle('activo', k === x.target.id); });
      });
    }, { rootMargin: '-50px 0px -75% 0px' });
    document.querySelectorAll('main > header, main > section').forEach(function(s){ io.observe(s); });
  }
})();
`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tokens de ${e(host ?? 'sitio sin dato')} — vista de prueba</title>
<style>${CSS}</style>
</head>
<body>
<nav aria-label="Secciones">
  <span class="marca-nav">Vista de prueba</span>
  <div class="enlaces">
    <a href="#resumen">Resumen</a>
    ${secciones.map(([id, titulo, n]) => `<a href="#${id}">${e(titulo)}${n === null ? '' : `<b>${n}</b>`}</a>`).join('\n    ')}${otros ? '\n    <a href="#otros">Otros</a>' : ''}
  </div>
  <label title="Oculta los tokens con 1–${BAJO_USO} usos"><input type="checkbox" id="ocultar-bajos"> <span>Ocultar</span> 1–${BAJO_USO} usos</label>
</nav>
<main>
${cabecera}
${secciones.map(([id, titulo, , cuerpo]) => `<section id="${id}">\n<h2>${e(titulo)}</h2>\n${cuerpo}\n</section>`).join('\n')}
${otros}
</main>
<dialog id="detalle"><div class="dlg-cab"><strong></strong><button type="button" data-cerrar>Cerrar</button></div><div class="dlg-cuerpo"></div></dialog>
<dialog id="visor"><div class="dlg-cab"><strong></strong><button type="button" data-cerrar>Cerrar</button></div><img alt="Captura completa de la página"></dialog>
<div id="aviso-copia" role="status"></div>
<script type="application/json" id="datos">${jsonSeguro}</script>
<script>${JS}</script>
</body>
</html>
`;

writeFileSync(join(outDir, 'index.html'), html);

console.log(`Vista generada: ${join(outDir, 'index.html')}`);
console.log(`  run: ${run?.id ?? basename(runDir)} · sitio: ${sitio ?? 'sin dato'}`);
console.log(`  tokens: ${tokens.length} (report.json: ${report?.tokens?.length ?? 'falta'}, tokens.json: ${dtcg ? hojas.size : 'falta'})`);
console.log(`  páginas: ${pages.length} (${conError} con error) · capturas copiadas: ${capturasCopiadas.size}`);
for (const a of avisos) console.log(`  aviso: ${a}`);
