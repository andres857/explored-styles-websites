# Fixtures

Mini-sitios HTML estáticos para los casos de `TEST_CATALOG.md`.
**No se modifican sin aprobación** (regla 3 de `CLAUDE.md`).

## Contrato del servidor de pruebas (se escribe en la Fase 4)

Cada carpeta `site-*` se sirve como raíz de un origen propio (`http://127.0.0.1:<puerto>`).
Los enlaces usan rutas limpias, así que el servidor debe resolver:

- `/` → `index.html`
- `/ruta` y `/ruta/` → `ruta.html` (sin redirigir)
- `/robots.txt` → el archivo si existe; si no, 404
- cualquier otra ruta sin archivo → 404

Comportamientos que un archivo estático no puede expresar (solo en `site-errors`):

| Ruta | Comportamiento simulado | Caso |
|------|-------------------------|------|
| `/slow` | Retrasa la respuesta más allá del timeout configurado en el test | CAT-07 |
| `/redirect-external` | `302` con `Location` al origen de `site-external` (otro puerto) | CAT-09 |

`https://external.example/` es un dominio reservado que nunca debe pedirse: el crawl lo descarta
por origen antes de navegar.

## Mapa fixture → casos

| Fixture | Casos | Qué contiene |
|---------|-------|--------------|
| `site-basic/` | CAT-01, 02, 10, 54, 55, 56 | 3 páginas enlazadas entre sí, `styles.css` con valores conocidos, un enlace a otro dominio |
| `site-depth/` | CAT-03, 04 | `index` (prof. 0) enlaza `level1` y `p01`…`p12` (prof. 1); cadena `level1 → level2 → level3 → level4`. 17 páginas en total |
| `site-urls/` | CAT-05 | Enlaces a `/page`, `/page/`, `/page#x` y `/page/#x`: una sola página `page` |
| `site-errors/` | CAT-06, 07, 09 | `index` enlaza, en este orden, `/missing` (404), `/slow`, `/redirect-external` y `/ok` |
| `site-robots/` | CAT-08 | `robots.txt` con `Disallow: /private/`; `/public` permitida, `/private/secret` prohibida |
| `site-external/` | CAT-09 | El "otro origen": destino del redirect; ninguna de sus páginas debe recorrerse |
| `extract/hidden.html` | CAT-11 | `#visible` (único que debe salir) y `#display-none`, `#visibility-hidden`, `#size-zero`, `#hidden-child` |
| `extract/css-variables.html` | CAT-12 | 5 variables en `:root`; `--local-only` está en `.scoped`, no en `:root` |
| `extract/no-css.html` | CAT-13 | HTML sin ninguna hoja de estilos ni atributo `style` |
| `extract/shadow-dom.html` | CAT-14 | Shadow root abierto (declarativo) con `.shadow-text` y `.shadow-btn` |
| `extract/js-injected.html` | CAT-15 | `#injected` se añade 200 ms después de `load` |

Los casos de NORMALIZE, NAME, EXPORT y API no usan HTML: sus entradas se construyen en el test.

## Valores conocidos de `site-basic/styles.css`

- Fondo del body `#ffffff`; texto `#1a1a1a`; texto secundario `#666666`.
- Fondo de botones (`button.btn` y `a.btn`) `#0055ff`; superficie de tarjetas y nav `#f5f5f5`.
- Cuerpo: `"Helvetica Neue", Arial, sans-serif`. Títulos h1–h3: `Georgia, "Times New Roman", serif`.
- Tamaños de fuente: 14, 16, 24, 32 px.
- Espaciado: 8, 16, 24, 32 px (todos múltiplos de 8).
- Radios: 4, 8, 16 px y 9999px (`.pill`).
- Sombras: una de una capa (`.card`) y una de dos capas (`.card--raised`).
- `.btn--ghost` tiene fondo `transparent` (no debe generar token).
