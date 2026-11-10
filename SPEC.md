# Proyecto: Explorador de estilos web — v1

## Objetivo
Una herramienta que recibe una URL, recorre varias páginas del mismo sitio y produce
un sistema de design tokens: colores, tipografía, espaciado, radios y sombras.
Guarda una captura de cada página. Expone los resultados por una API HTTP.

Fuera de alcance en v1: componentes, vistas, modo oscuro, viewport móvil, llamadas a IA,
interfaz gráfica.
Fase 2 (NO construir, solo tenerla en cuenta): un editor con vista previa para crear
vistas usando estos tokens. Por eso la salida debe ser estable y fácil de consumir.

## Principios
- Todo lo que se puede medir lo hace código determinista: mismo input → mismo output.
- Nombrar tokens va detrás de la interfaz `Namer`. En v1 se implementa `HeuristicNamer`;
  en v1.1 se añadirá `AiNamer` con la misma interfaz.
- Cada etapa es una función con entrada y salida tipadas y validadas con zod.
  Todas son puras excepto el crawl.
- Los empates siempre se resuelven de forma determinista (por valor canónico, alfabético).

## Stack
Node LTS, TypeScript strict, ESM, Playwright (Chromium), zod, Express, Vitest, Stryker.
Persistencia en archivos, sin base de datos.

## Estructura
```
src/
  core/
    schemas.ts     # todos los esquemas zod
    crawl/         # URL → PageSnapshot[]
    extract/       # PageSnapshot[] → RawStyleEntry[]
    normalize/     # RawStyleEntry[] → TokenCandidates
    name/          # Namer + HeuristicNamer → NamedTokens
    export/        # NamedTokens → tokens.json (DTCG) + report.json
    pipeline.ts    # orquesta las etapas y escribe en runs/
  cli/index.ts     # explorer crawl <url> [--max-pages 10] [--max-depth 2]
  server/          # Express
runs/<runId>/
  run.json         # estado: queued | running | done | failed, fechas, parámetros
  pages.json       # páginas recorridas, status, errores
  tokens.json      # formato DTCG
  report.json      # por token: conteo, páginas, hasta 5 selectores de ejemplo; cssVariables
  screenshots/<slug>.png
tests/
  fixtures/  unit/  integration/
```

## Contratos (en schemas.ts)
- PageSnapshot: url, status, title, screenshotPath, error?, cssVariables{},
  elements[]: selector, tag, computed {color, backgroundColor, fontFamily, fontSize,
  fontWeight, lineHeight, letterSpacing, marginTop/Right/Bottom/Left,
  paddingTop/Right/Bottom/Left, gap, borderRadius (4 esquinas), boxShadow,
  borderColor (4 lados), borderWidth (4 lados)}.
- RawStyleEntry: category, property, rawValue, pageUrl, selector, tag.
- TokenCandidates: por categoría, lista de { canonicalValue, occurrences[] }.
- NamedTokens: candidatos + name + $type DTCG.
- DtcgTokens: el esquema de tokens.json (ver "Salida DTCG").
- Report: el esquema de report.json. RunFile y PagesFile: los de run.json y pages.json.

## Reglas de extracción
- El color de borde de un lado solo genera entrada si el ancho de ese lado es mayor que 0.
  El ancho de borde no genera token en v1.
- Las variables CSS de :root no generan tokens: viajan aparte hasta report.json.

## Reglas del crawl
- Solo el mismo origen que la URL inicial; enlaces externos se ignoran.
- Valores por defecto: maxPages 10, maxDepth 2, 1000 ms entre páginas, timeout de 30 s,
  viewport 1440x900.
- Respetar robots.txt.
- Normalizar URLs: quitar #hash, la barra final y el query (`/page?a=1` ≡ `/page`).
  Se visita la URL ya normalizada.
- Antes de extraer, esperar a networkidle y a document.fonts.ready.
- Una página que falla (4xx, 5xx, timeout) se registra en pages.json y el recorrido sigue.
- Un redirect a otro origen se trata como página externa.
- Solo elementos visibles: excluir display:none, visibility:hidden y tamaño 0.

## Reglas de normalización
- Color: formato canónico hex en minúsculas, de 6 dígitos (8 si alfa < 1).
  #fff, #ffffff, rgb(255,255,255) y hsl(0 0% 100%) son el mismo token.
- transparent y alfa 0 no generan token.
- Los colores casi iguales NO se fusionan. Se listan en report.json como
  `nearDuplicates` cuando su diferencia (deltaE 2000) es menor que 2.
- Tamaños: todo a px con un decimal como máximo. rem/em ya llegan resueltos del navegador.
- lineHeight `normal` y letterSpacing `normal` se guardan como "normal", sin convertir.
- Espaciado: se ignoran los valores 0 y auto. Si al menos el 70 % de los valores son
  múltiplos de 4, se reporta baseUnit = 4 (mismo criterio con 8, que tiene prioridad).
- Radio: 9999px o más, o 50 %, se agrupan como "full". El radio 0 no genera token.
  Si las 4 esquinas son iguales cuentan como una ocurrencia; si difieren, una por valor distinto.
- Sombras: `none` se ignora. Las sombras de varias capas son un solo token.
- fontFamily: se toma la pila completa como valor y la primera familia como nombre corto.
  Antes de comparar pilas se unifican comillas y espacios.
- fontWeight: siempre numérico; `normal` → 400 y `bold` → 700.

## HeuristicNamer (v1)
- color.surface = fondo del body. color.text.primary = color de texto más frecuente.
  color.text.secondary = el segundo más frecuente.
- color.primary = fondo más frecuente en button y en a con fondo.
- El resto de colores (incluidos los de borde): color.palette.N, por luminancia ascendente;
  empate por hex.
- Un valor recibe un solo nombre. Los roles se asignan en este orden y cada uno toma su mejor
  candidato aún sin nombre: surface → primary → text.primary → text.secondary → palette.
  Un rol sin candidato no se crea.
- font.family.body = familia más usada; font.family.heading = familia más usada en h1-h3
  (si es la misma que body, no se crea).
- font.size: ordenados de menor a mayor como 100, 200, 300…
- font.weight.<valor> (p. ej. font.weight.400). font.lineHeight.N y font.letterSpacing.N,
  con N = 1, 2, 3… de menor a mayor.
- space con baseUnit B: los múltiplos son space.<valor/B>; los no múltiplos, space.px-<valor>
  (el decimal se escribe con `_`). Si no hay baseUnit, space.1..N por orden.
- radius por orden: 1 valor → md; 2 → sm y lg; 3 → sm, md y lg; 4 o más → radius.1..N.
  radius.full va siempre aparte, si existe.
- shadow.1..N ordenadas por radio de blur (el máximo entre capas); empate por valor canónico.

## Salida DTCG
tokens.json sigue el Design Tokens Format Module 2025.10. El esquema contra el que se valida
es `DtcgTokensSchema` (zod, en schemas.ts).
- Cada token usa $value y $type (color, dimension, fontFamily, fontWeight, shadow, number).
- color: { colorSpace: "srgb", components: [r, g, b] entre 0 y 1, alpha, hex }.
- dimension: { value, unit: "px" }. radius.full se exporta como 9999 px.
- fontFamily: array de strings. fontWeight: número.
- shadow: { color, offsetX, offsetY, blur, spread, inset }; con varias capas, un array.
- Los nombres de token y de grupo no contienen `.`, `{` ni `}`, ni empiezan por `$`.
- El valor canónico interno (hex, px) no cambia: la conversión ocurre solo al exportar.
- Los valores "normal" no son un tipo DTCG: no van a tokens.json, sí a report.json.
- El uso (conteo y páginas) va en $extensions["explorer.usage"].
- tokens.json no lleva fechas ni runId y se escribe con las claves ordenadas: dos corridas
  del mismo sitio producen el mismo archivo byte a byte.

## report.json
- Por token: conteo, páginas, hasta 5 selectores de ejemplo y `matchingVariables` (variables
  CSS cuyo valor, normalizado como color o como px, coincide con el del token).
- `nearDuplicates` y `baseUnit`.
- `cssVariables`: lista de { name, value, pages }, ordenada por nombre.

## API (Express)
- POST /api/runs { url, maxPages?, maxDepth? } → 202 { runId }. Corre en segundo plano.
  Solo un recorrido a la vez; los demás quedan en cola. Solo se aceptan URLs http(s).
- GET /api/runs → lista de runs con estado.
- GET /api/runs/:id → run.json + pages.json.
- GET /api/runs/:id/tokens → tokens.json.
- GET /api/runs/:id/report → report.json.
- GET /api/runs/:id/screenshots/:file → imagen. Solo se aceptan nombres `<slug>.png`.
- Errores con forma { error: { code, message } }. 404 si el run no existe; 400 si la entrada
  es inválida; 409 si se piden tokens o report de un run que no ha terminado.
- El servidor escucha en 127.0.0.1 por defecto.

## Catálogo de tests
Ver `TEST_CATALOG.md` (CAT-01 a CAT-59).

## Fases (una por sesión)
0. Preparación
1. schemas.ts + normalize (CAT-16 a 26 y 37 a 41)
2. name + export (CAT-27 a 32 y 42 a 51)
3. extract con fixtures (CAT-11 a 15 y 52)
4. crawl (CAT-01 a 10 y 53)
5. pipeline + CLI (CAT-54 a 56)
6. server (CAT-33 a 36 y 57 a 59)
7. Mutation testing sobre normalize y name; meta: puntuación ≥ 80 %

## Reglas para el agente
Ver `CLAUDE.md`.
