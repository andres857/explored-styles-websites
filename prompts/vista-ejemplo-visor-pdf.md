# Prompt del subagente: vista de ejemplo (visor de PDF) con los tokens extraídos

## Objetivo

Demostrar el segundo uso del Explorador de estilos web: construir una vista **nueva** con el
lenguaje visual de un sitio ya analizado. La vista es un visor de PDF, una pantalla que el
sitio original no tiene, y debe parecer hecha por el mismo equipo que hizo
https://catscribetranslate.com/.

La regla central: **todos los valores visuales salen de los tokens extraídos**. Nada de
colores, tamaños, radios, sombras o familias escritos a mano.

## Entradas (solo lectura)

Run: `/home/andres/Documents/projects/explorador-web-estilos/runs/20261110-210731-c9b707/`

- `tokens.json`: tokens en formato DTCG 2025.10 (grupos anidados; hojas con `$type` y `$value`).
- `report.json`: por token, `name`, `value`, `count` (usos) y `matchingVariables`.
- `screenshots/*.png`: capturas del sitio original. Míralas para entender su estilo:
  densidad, jerarquía, cómo usa el color de acento, cómo son sus botones y tarjetas.

Lee los archivos reales antes de diseñar.

## Salidas

Todo dentro de `/home/andres/Documents/projects/explorador-web-estilos/preview/visor-pdf/`:

1. `build-tokens.mjs`: script de Node sin dependencias que convierte el `tokens.json` de un
   run en `tokens.css`, con una propiedad CSS por token (`color.text.primary` →
   `--color-text-primary`, `space.2` → `--space-2`, etc.). Uso:
   `node preview/visor-pdf/build-tokens.mjs runs/<id>`.
2. `tokens.css`: el resultado para este run. Es generado: no lo edites a mano.
3. `index.html`: el visor. Sus estilos usan únicamente `var(--…)` de `tokens.css`.
4. `ejemplo.pdf`: un PDF de muestra de varias páginas para que la vista abra con contenido.
   Puedes generarlo con Playwright (`page.pdf()`), que ya está instalado.
5. `TOKENS-USADOS.md`: qué token se usó para cada papel de la interfaz y por qué.

## Qué debe tener el visor

- **Barra superior**: nombre del documento, página actual y total, zoom (menos, más,
  ajustar al ancho), botón para abrir otro PDF del equipo y botón de descarga.
- **Panel lateral** plegable con la lista de páginas o miniaturas.
- **Área del documento**: el PDF sobre un fondo de superficie.
- **Estados**: sin documento (invitación a abrir uno o arrastrarlo), cargando, y error cuando
  el archivo no es un PDF.
- Debe **funcionar de verdad**: abrir `ejemplo.pdf` al cargar y permitir elegir otro PDF
  local. Usa el visor nativo del navegador (`<iframe>`/`<embed>` con una URL de objeto); no
  hay que renderizar el PDF a mano ni usar pdf.js.
- Si los controles de página y zoom no se pueden conectar al visor nativo, dilo en la
  interfaz o no los muestres: ningún botón que parezca funcionar y no haga nada.
- Navegable con teclado, con foco visible, y usable a 1440 px y a ancho de móvil.

## Reglas sobre los tokens

- Usa los tokens por su nombre. Si un rol no sirve para lo que su nombre promete, **no lo
  fuerces ni lo arregles**: usa el token que sí sirve y anótalo.
  Dato conocido: en este run `color.primary` es `#ffffff` y el color de marca del sitio
  (`#4f46e5`) quedó como `color.palette.4`. Es un defecto del extractor; para el acento usa
  el token de paleta y déjalo escrito en `TOKENS-USADOS.md`.
- Prefiere los tokens con muchos usos; los de 1 o 2 usos son probablemente accidentales.
- Único valor permitido fuera de los tokens: lo que el sistema no extrae (anchos de
  maquetación, `0`, `100%`, duraciones de transición, `z-index`). Si necesitas un color o un
  tamaño que no existe como token, no lo inventes: anótalo como hueco del extractor.
- Las fuentes del sitio (Inter, Sora) se usan vía su pila; no descargues fuentes.

## Límites

- No modifiques nada fuera de `preview/visor-pdf/`. No toques `preview/index.html`,
  `preview/build.mjs`, `src/`, `tests/`, `runs/` ni los documentos del proyecto.
- Sin dependencias nuevas, sin CDN, sin peticiones de red desde la página.
- Sin llamadas a APIs de IA. Sin commits ni cambios de rama.
- No mates ni reinicies procesos que ya estén corriendo (hay un servidor en el puerto 4310).

## Verificación antes de terminar

Con Playwright, ejecutando el script desde
`/home/andres/Documents/projects/explorador-web-estilos/.claude/worktrees/fase-1-normalize`
(ahí resuelve `playwright`):

1. `build-tokens.mjs` termina sin errores y `tokens.css` tiene una propiedad por cada token
   de `tokens.json`.
2. `index.html` abre con `file://` sin errores de consola ni peticiones fallidas.
3. Ningún color, tamaño de fuente, radio, sombra o familia está escrito a mano en los estilos
   de `index.html`: compruébalo buscando en el archivo, no de memoria.
4. Sin desplazamiento horizontal a 1440 px ni a 390 px.
5. Los estados vacío y de error se pueden provocar y se ven bien.
6. Capturas en `verificacion-1440.png` y `verificacion-390.png`. Chromium sin interfaz puede
   no dibujar el PDF incrustado en una captura; si pasa, dilo y captura igualmente el marco.

Borra los scripts de comprobación al terminar.

## Informe final

Archivos creados; resultado de cada comprobación con cifras; la tabla de tokens usados; los
huecos del extractor que encontraste al intentar construir una vista real (tokens que faltan,
roles mal asignados, escalas que no ayudan); y lo que no funciona o no pudiste comprobar.
