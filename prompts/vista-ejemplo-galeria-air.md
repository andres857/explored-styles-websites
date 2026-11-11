# Prompt del subagente: galería de imágenes con barra lateral, con los tokens de Air

## Objetivo

Construir una vista **nueva** de ejemplo: una galería de imágenes con barra lateral, que
parezca hecha por el mismo equipo que hizo la aplicación analizada, usando solo los tokens
que el Explorador de estilos web extrajo de ella.

La regla central: **todos los valores visuales salen de los tokens extraídos**. Nada de
colores, tamaños de fuente, radios, sombras o familias escritos a mano.

## Entradas (solo lectura)

- Run: `/home/andres/Documents/projects/explorador-web-estilos/runs/20261111-013633-2f4ac1/`
  (`tokens.json` en DTCG 2025.10, `report.json` con usos y `matchingVariables`, capturas en
  `screenshots/`). Son 5 pantallas internas de una aplicación de trabajo, densa y sobria,
  con barra lateral de iconos y paneles blancos sobre fondo gris.
- Referencia ya construida con estos mismos tokens:
  `/home/andres/Documents/projects/explorador-web-estilos/preview/visor-pdf-air/`
  Lee su `TOKENS-USADOS.md`: ya está resuelto qué token sirve para cada papel (texto, bordes,
  fondos, acento, foco, sombras útiles) y qué roles del extractor están mal asignados.
  Reutiliza esas decisiones en vez de redescubrirlas, y puedes reutilizar su generador
  `build-tokens.mjs` como punto de partida para el tuyo.

## Salidas

Todo dentro de `/home/andres/Documents/projects/explorador-web-estilos/preview/galeria-air/`:

1. `build-tokens.mjs` y `tokens.css` (generado; una propiedad CSS por token).
2. `index.html`: la galería. Sus estilos usan únicamente `var(--…)` de `tokens.css`.
3. `imagenes/`: imágenes de muestra generadas por ti (ver más abajo).
4. `TOKENS-USADOS.md`: qué token se usó para cada papel, y los huecos nuevos que encuentres.
5. `verificacion-1440.png` y `verificacion-390.png`.

## Qué debe tener la vista

- **Barra lateral** con:
  - secciones de navegación (por ejemplo: Todas, Recientes, Favoritas, Papelera);
  - una lista de colecciones o carpetas con su número de imágenes;
  - filtros por etiqueta o por tipo;
  - plegable en escritorio y convertida en capa deslizante en móvil.
- **Barra superior**: título de la sección actual, búsqueda, orden (nombre, fecha, tamaño),
  cambio entre cuadrícula y lista, y botón principal para añadir imágenes.
- **Cuadrícula de imágenes**: tarjeta con miniatura, nombre, dimensiones y fecha; estados de
  hover, foco y selección; selección múltiple con una barra de acciones que aparece al
  seleccionar.
- **Vista de lista** alternativa, en tabla, con las mismas imágenes.
- **Visor ampliado** al abrir una imagen: imagen grande, anterior y siguiente, cerrar con
  Escape, y un panel con sus datos (nombre, dimensiones, tamaño, etiquetas, colección).
- **Estados**: colección vacía, búsqueda sin resultados, y carga de imágenes nuevas.
- **Debe funcionar de verdad**: buscar, ordenar, filtrar, cambiar de colección, marcar
  favoritas, seleccionar varias, mover a la papelera y añadir imágenes del equipo (botón y
  arrastrar y soltar, con URL de objeto). Ningún control que parezca funcionar y no haga nada;
  lo que no funcione, no se muestra.
- El estado vive en memoria: al recargar vuelve al inicio. Dilo en la interfaz de forma
  discreta. No uses `localStorage`.
- Navegable con teclado, con foco visible, y usable a 1440 px y a ancho de móvil.

## Imágenes de muestra

- Genera tú entre 18 y 24 imágenes: SVG o PNG creados por código (formas, degradados,
  patrones, composiciones abstractas), con proporciones variadas (horizontales, verticales,
  cuadradas) para que la cuadrícula se ponga a prueba.
- **No descargues imágenes** ni uses fotos, logotipos o marcas de nadie.
- **No recortes ni reutilices nada de las capturas del run**: contienen datos de la cuenta de
  una persona.
- Los colores de las imágenes son contenido, no interfaz: no tienen que venir de los tokens.
- Dales nombres, etiquetas y colecciones genéricos y creíbles.

## Reglas sobre los tokens

- Usa los tokens por su nombre. Si un rol no sirve para lo que promete, no lo fuerces: usa el
  token que sí sirve y anótalo. Datos ya conocidos de este run: `color.primary` (`#00276d`) sí
  es el color del botón principal; `color.text.primary` es `#000000` heredado del `body` y el
  texto real es `color.palette.2` (`#202020`); solo 2 de las 5 sombras son sombras reales.
- Prefiere los tokens con muchos usos.
- Único valor permitido fuera de los tokens: lo que el sistema no extrae (anchos de
  maquetación, columnas de la cuadrícula, `0`, `100%`, duraciones, `z-index`, cortes de
  `@media`). Si necesitas un color o un tamaño de fuente que no existe como token, no lo
  inventes: anótalo como hueco del extractor.
- La fuente (Inter) se usa vía su pila; no descargues fuentes.

## Límites

- No modifiques nada fuera de `preview/galeria-air/`. En particular no toques
  `preview/visor-pdf-air/`, `preview/visor-pdf/`, `preview/air/`, `preview/index.html`,
  `preview/build.mjs`, `src/`, `tests/`, `runs/` ni los documentos del proyecto.
- **Privacidad**: el run contiene el nombre de una persona, el de su espacio de trabajo y el
  de un tablero. No copies esos textos a ningún archivo ni a tu informe. No leas la carpeta
  `.auth/`.
- **No uses el logotipo, el nombre ni los iconos del sitio analizado** como si la vista fuera
  un producto suyo. La cabecera debe decir que es una vista de ejemplo generada con tokens
  extraídos. Los iconos, dibújalos tú en SVG.
- No abras el sitio analizado ni ningún otro sitio en la red.
- Sin dependencias nuevas, sin CDN, sin peticiones de red desde la página.
- Sin llamadas a APIs de IA. Sin commits ni cambios de rama.
- No mates ni reinicies procesos que ya estén corriendo: hay un servidor en el puerto 4310 y
  puede haber una ventana de Google Chrome del usuario con depuración en el puerto 9333. No te
  conectes a ese Chrome.

## Verificación antes de terminar

Con Playwright, ejecutando tus scripts desde
`/home/andres/Documents/projects/explorador-web-estilos/.claude/worktrees/fase-1-normalize`
(ahí resuelve `playwright`):

1. `build-tokens.mjs` termina sin errores y `tokens.css` tiene una propiedad por token.
2. `index.html` abre con `file://` sin errores de consola, sin peticiones fallidas y sin
   peticiones http(s).
3. Ningún color, tamaño de fuente, radio, sombra o familia está escrito a mano en los estilos:
   compruébalo buscando en el archivo.
4. Sin desplazamiento horizontal a 1440 px ni a 390 px, con la barra lateral abierta y cerrada.
5. Cada función se prueba de verdad: buscar, ordenar, filtrar, cambiar de colección, favoritas,
   selección múltiple, papelera, añadir una imagen local, cuadrícula y lista, visor ampliado con
   teclado (flechas y Escape), estados vacío y sin resultados.
6. Todas las imágenes de muestra cargan.
7. Capturas en `verificacion-1440.png` y `verificacion-390.png`.

Borra los scripts de comprobación al terminar.

## Informe final

Archivos creados; resultado de cada comprobación con cifras; tabla de tokens usados; huecos
del extractor que aparecen al construir una galería y que no aparecían con el visor de PDF
(por ejemplo: estados de selección, superposiciones sobre imagen, rejillas, densidad); y lo
que no funciona o no pudiste comprobar.
