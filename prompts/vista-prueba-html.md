# Prompt del subagente: vista de prueba HTML de los tokens extraídos

## Objetivo

Crear una página HTML que muestre de forma visual el resultado de un run del Explorador de
estilos web: los design tokens extraídos de https://catscribetranslate.com/ y cuánto se usa
cada uno. Hoy el resultado solo existe como JSON; esta vista es para que una persona lo
pueda mirar y juzgar de un vistazo.

Es una vista de prueba, no parte del producto: la interfaz gráfica está fuera de la Fase 1.

## Entradas (solo lectura)

Run: `/home/andres/Documents/projects/explorador-web-estilos/runs/20261110-210731-c9b707/`

- `tokens.json`: tokens en formato DTCG 2025.10. Grupos anidados; cada hoja tiene `$type`,
  `$value` y `$extensions["explorer.usage"]` con `count` y `pages`.
  - color: `{ colorSpace: "srgb", components: [r, g, b] (0–1), alpha, hex }`
  - dimension: `{ value, unit: "px" }`
  - fontFamily: array de strings. fontWeight: número.
  - shadow: objeto `{ color, offsetX, offsetY, blur, spread, inset }`, o array si tiene capas.
- `report.json`: `tokens[]` con `name`, `category`, `value`, `count`, `pages`, `selectors`
  (hasta 5), `matchingVariables` y a veces `clippedFrom`; además `nearDuplicates`,
  `baseUnit` y `cssVariables`.
- `pages.json`: páginas recorridas con `url`, `status`, `title`, `screenshot` y `error`.
- `run.json`: id, estado, parámetros y fechas.
- `screenshots/*.png`: una captura por página recorrida.

Lee los archivos reales antes de diseñar: no supongas nombres ni cantidades.

## Salidas

Todo dentro de `/home/andres/Documents/projects/explorador-web-estilos/preview/`:

1. `build.mjs`: script de Node sin dependencias que recibe la carpeta de un run y genera la
   vista. Uso: `node preview/build.mjs runs/<id>`. Debe servir para cualquier run, no solo
   para este.
2. `index.html`: la vista generada para el run de arriba. Un solo archivo, con los datos y
   los estilos dentro, que se abre con doble clic (`file://`) y funciona sin red.
3. `screenshots/`: copia de las capturas del run, referenciadas con ruta relativa.

## Qué debe mostrar

1. **Cabecera**: sitio analizado, fecha del run, páginas recorridas (y cuántas con error),
   total de tokens y `baseUnit`.
2. **Color**: primero los roles (`surface`, `primary`, `text.primary`, `text.secondary`),
   después la paleta. Cada color con su muestra, nombre del token, hex, número de usos y las
   variables CSS que coinciden. Los colores con transparencia deben verse como tales (fondo
   de cuadros detrás de la muestra).
3. **Tipografía**: familias (con su pila completa), y una muestra de texto por cada tamaño,
   con su nombre, valor y usos. Pesos, interlineados y letter-spacing en tablas compactas.
4. **Espaciado**: una barra por valor, a escala real, ordenadas de menor a mayor.
5. **Radios**: un cuadro por valor con ese radio aplicado.
6. **Sombras**: una tarjeta por sombra con la sombra aplicada, incluidas las de varias capas.
7. **Casi duplicados**: los pares de `nearDuplicates`, lado a lado, con su deltaE.
8. **Páginas**: cada página con su captura en miniatura (clic para verla completa), título,
   URL y estado; las que fallaron, con su error.
9. **Variables CSS** del sitio, en una sección plegable.

En cada token debe verse cuánto se usa: esa cifra es lo que distingue un valor central de uno
accidental. Los valores con 1 o 2 usos deben poder distinguirse de un vistazo.

## Diseño

- Sobria y legible: es una herramienta de inspección, no una landing. Que el protagonista sea
  el sistema de diseño analizado, no la vista.
- La interfaz de la vista usa colores neutros propios; no la pintes con los tokens extraídos,
  para que no se confundan con lo que se está mostrando.
- Navegación fija con enlaces a cada sección.
- Usable a 1440 px y a ancho de móvil, sin desplazamiento horizontal de la página.
- Modo claro y oscuro según la preferencia del sistema.
- Texto de la interfaz en español.
- Copiar el valor de un token con un clic es deseable.

## Límites

- No modifiques nada fuera de `preview/`: ni `src/`, ni `tests/`, ni `runs/`, ni `SPEC.md`,
  `TEST_CATALOG.md`, `PROGRESO.md` o `CLAUDE.md`.
- Sin dependencias nuevas, sin CDN, sin fuentes remotas, sin peticiones de red desde la página.
- Sin llamadas a APIs de IA.
- No hagas commits ni cambies de rama.
- No inventes datos: todo lo que se muestra sale de los archivos del run. Si un dato falta, la
  sección lo dice en vez de rellenarlo.

## Verificación antes de terminar

1. Ejecuta `node preview/build.mjs runs/20261110-210731-c9b707` desde la raíz del proyecto y
   comprueba que termina sin errores.
2. Abre `preview/index.html` con Playwright (está instalado en el proyecto; ejecuta el script
   de comprobación desde
   `/home/andres/Documents/projects/explorador-web-estilos/.claude/worktrees/fase-1-normalize`,
   que es donde resuelve `playwright`) y comprueba:
   - cero errores en la consola y cero peticiones de red fallidas;
   - el número de tokens mostrados coincide con `report.json`;
   - sin desplazamiento horizontal a 1440 px ni a 390 px.
3. Guarda dos capturas de la vista en `preview/verificacion-1440.png` y
   `preview/verificacion-390.png`.

## Informe final

Qué archivos creaste, el resultado de cada comprobación con sus cifras, cualquier dato del
run que te haya parecido raro o inconsistente, y lo que no pudiste hacer.
