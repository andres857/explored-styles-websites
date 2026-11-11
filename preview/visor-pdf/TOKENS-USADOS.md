# Tokens usados en el visor de PDF

Run de origen: `runs/20261110-210731-c9b707` (https://catscribetranslate.com/, 4 páginas).
`tokens.css` se genera con `node preview/visor-pdf/build-tokens.mjs runs/20261110-210731-c9b707`
y contiene 155 propiedades, una por token. `index.html` usa 66 de ellas.

Entre paréntesis, los usos que `report.json` cuenta para cada token en el sitio original.

## Color

| Papel en el visor | Token | Valor | Por qué |
|---|---|---|---|
| Fondo de la aplicación y del área del documento | `color.surface` (4) | `#f6f7fc` | Es el fondo del `body` del sitio. Tiene 4 usos porque hay un `body` por página, no porque sea raro. |
| Barra superior, panel lateral, tarjetas, botones secundarios | `color.primary` (45) | `#ffffff` | El nombre promete el color de marca, pero es el blanco de paneles y tarjetas (`--panel`, `--card-bg`, `--btn-bg`). Se usa como lo que es. |
| Texto sobre el acento (botón principal) | `color.primary` (45) | `#ffffff` | Mismo token; no hay un "texto sobre acento" propio. |
| Texto principal | `color.text.primary` (374) | `#101427` | Rol correcto. |
| Texto secundario, etiquetas, pies | `color.text.secondary` (293) | `#5a6379` | Rol correcto. |
| Acento: botón principal, sobretítulo, página activa, foco, marca de encabezado | `color.palette.4` (49) | `#4f46e5` | Color de marca del sitio (`--accent`, `--brand`). Debería ser `color.primary`; ver huecos. |
| Bordes y separadores | `color.palette.18` (301) | `#e4e7f2` | Es `--border`, el color más repetido tras el texto. |
| Borde de la zona de arrastre, de la insignia y hover de botones | `color.palette.17` (28) | `#dfe3f0` | Borde de los campos de formulario del sitio. |
| Pie del documento, grupos de controles, zona de arrastre | `color.palette.20` (30) | `#fbfbfe` | Fondo de las tarjetas pequeñas y del pie de las capturas (`--mini-bg`, `--shot-cap-bg`). |
| Hover de botones, botones desactivados, fondo detrás del PDF | `color.palette.19` (8) | `#eef0f9` | `--panel2`, cabeceras de tabla. |
| Fondo de la página activa y del botón "Ajustar al ancho" activo | `color.palette.7` (3) | `#6366f117` | Solo 3 usos, pero es exactamente `--side-active-bg`: el fondo del elemento activo del menú lateral del sitio. |
| Borde del botón tintado activo | `color.palette.10` (8) | `#6366f159` | Borde del botón "News" del sitio. |
| Borde del botón tintado en hover | `color.palette.11` (4) | `#6366f18c` | Borde de la descarga recomendada. |
| Pista del indicador de carga | `color.palette.9` (6) | `#6366f140` | Puntos inactivos del carrusel. |
| Hover de los elementos de la lista de páginas | `color.palette.2` (2) | `#10142709` | Pocos usos. Es `--chip-bg`; el hover real del sitio (`--side-hover-bg`) no se extrajo. |

## Tipografía

| Papel | Token | Valor |
|---|---|---|
| Texto de interfaz | `font.family.body` (640) | Inter y su pila |
| Nombre del documento, títulos de estado, marca | `font.family.heading` (81) | Sora y su pila |
| Texto base de la interfaz, botones, lista | `font.size.600` (194) + `font.lineHeight.14` (163) | 13px / 21.5px |
| Párrafos de los estados vacío y de error | `font.size.1000` (185) + `font.lineHeight.18` (166) | 15px / 24.8px |
| Nombre del documento | `font.size.1100` (128) + `font.lineHeight.15` (16) | 16px / 22.4px |
| Título de los estados | `font.size.1600` (14) + `font.lineHeight.23` (70) | 24px / 28px |
| Título de los estados en móvil, aviso al arrastrar | `font.size.1400` (11) | 20px |
| Marca del panel | `font.size.900` (38) | 14px |
| Pie del documento, notas del panel, insignia | `font.size.400` (60) + `font.lineHeight.10` (52) | 12px / 19.8px |
| Sobretítulo y etiqueta "Páginas" | `font.size.300` (24) + `font.lineHeight.8` (13) | 11px / 18.2px |
| Mayúsculas espaciadas del sobretítulo | `font.letterSpacing.12` (17) | 0.9px |
| Títulos en Sora | `font.letterSpacing.7` (33), `font.letterSpacing.5` (12) | -0.3px, -0.5px |
| Pesos | `font.weight.400` (532), `.500` (53), `.600` (49), `.700` (80), `.800` (25) | texto, lista, botones, énfasis, títulos |

## Radio, sombra y espacio

| Papel | Token | Valor | Por qué |
|---|---|---|---|
| Botones, grupos de controles, insignia, marca de encabezado | `radius.10` (14) | 999px | Los botones del sitio son píldoras. |
| Tarjeta del documento y tarjetas de estado | `radius.9` (14) | 18px | Es `--radius`, el de las tarjetas grandes. |
| Zona de arrastre | `radius.7` (34) | 14px | Tarjetas pequeñas del sitio. |
| Elementos de la lista de páginas | `radius.4` (12) | 11px | El de los elementos del menú lateral. |
| Indicador de carga | `radius.full` (3) | 9999px | Círculo. |
| Botón principal | `shadow.6` (5) | sombra índigo | La de los botones de llamada a la acción. |
| Hover del botón principal | `shadow.6` + `shadow.1` (1) | anillo interior | No hay token de hover; se combinan dos existentes. |
| Botones secundarios, insignia | `shadow.2` (8) | 0 1px 2px | La de las insignias. |
| Tarjeta del documento | `shadow.9` (4) | sombra larga | La de las capturas de pantalla del sitio: mismo papel (un documento enmarcado con pie). |
| Tarjetas de estado vacío y de error | `shadow.8` (4) | sombra con tinte | La de la tarjeta principal. |
| Tarjeta de carga | `shadow.7` (7) | sombra suave | `--shadow-soft`. |
| Ancho de borde | `space.1` (6) | 1px | No hay tokens de borde; ver huecos. |
| Grosor del foco, del trazo de iconos y del indicador de carga | `space.2` (83) | 2px | |
| Separaciones y rellenos | `space.3`, `.6`, `.8`, `.11`, `.13`, `.15`, `.17`, `.21`, `.22`, `.23` | 4 a 24px | Todos con 15 usos o más. |
| Alto mínimo de botones (escritorio) y relleno de tarjetas | `space.28` (20) | 34px | |
| Alto de los botones dentro de un grupo | `space.26` (3) | 30px | Pocos usos. |
| Alto de botones en móvil | `space.31` (3), `space.29` (2) | 40px, 36px | Pocos usos; no hay nada entre 34 y 44.8 con más. |
| Tamaño de iconos | `space.17` (148) | 16px | No hay tokens de tamaño de icono. |
| Ancho mínimo del nombre del documento | `space.39` (2) | 184px | Maquetación. |

## Valores fuera de los tokens

Solo maquetación, como permite el encargo: `--layout-sidebar: 270px`, `--layout-card: 560px`,
`--layout-list-max: 40dvh`, el corte `@media (max-width: 820px)`, `0`, `100%`, `100dvh`, `fr`,
las duraciones (120 ms, 800 ms, 4 s) y las palabras clave `transparent`, `currentColor`,
`inherit` y `none`.

## Huecos del extractor

Encontrados al construir una pantalla real con este run.

**Roles mal asignados**

1. `color.primary` es `#ffffff`, el fondo de paneles. El color de marca `#4f46e5` quedó como
   `color.palette.4` aunque el sitio lo declara como `--accent` y `--brand`, y `report.json`
   ya lo sabe (`matchingVariables`). El nombrado podría usar esas variables.
2. No existe un rol para el blanco de paneles (`--panel`, `--card-bg`), ni para el borde
   (`--border`, 301 usos, queda como `palette.18`), ni para el acento.
3. El recuento de usos no distingue importancia: `color.surface` tiene 4 usos y el fondo
   translúcido de la cabecera (`palette.21`) tiene 1, y ambos son estructurales. "Pocos usos
   = accidental" falla con los elementos que solo aparecen una vez por página.

**Tokens que faltan**

4. Color de error. El sitio declara `--bad: #dc2626`, pero como ningún elemento lo usa en las
   páginas analizadas no llega a `tokens.json`. El estado de error del visor no tiene color
   propio: usa texto principal y una insignia neutra.
5. Degradados. El botón principal del sitio usa `--accent-grad` y el fondo de la página dos
   degradados radiales. No hay tipo de token para ellos; el botón principal del visor es un
   color plano y por eso se ve algo más apagado que el original.
6. Estados. No se capturan `:hover`, `:focus-visible` ni `:disabled`. El sitio tiene
   `--focus-ring`, `--side-hover-bg` y `--docs-hover`; el visor improvisa con `palette.4`
   (foco), `palette.2` y `palette.19` (hover).
7. Anchos de borde. No hay categoría; se usa `space.1` y `space.2`.
8. Opacidad. El sitio atenúa las descargas no disponibles con opacidad. No hay token, así que
   los botones desactivados del visor cambian de fondo y color en lugar de atenuarse.
9. Velo oscuro para capas. No hay ningún color oscuro translúcido útil (los que hay están al
   3–4 % de alfa), así que en móvil el panel empuja el contenido en vez de superponerse.
10. `backdrop-filter` de la cabecera, tamaños de icono y tamaños de control: no se extraen.

**Escalas que no ayudan**

11. Alturas de línea en píxeles absolutos: 29 tokens que en su mayoría son `1.65 × tamaño`
    (21.5 = 13 × 1.65; 24.8 = 15 × 1.65; 19.8 = 12 × 1.65). Hay que emparejar a mano cada
    tamaño con su altura. El valor `normal` (128 usos) solo está en `report.json`.
12. Espacios: 40 pasos, con ruido de valores calculados (`5.6px`, `9.1px`, `19.2px` y
    `19.3px`, `24.7px`, `44.8px`) y valores de maquetación mezclados (`184px`, `320px`).
    `baseUnit` es `null`. Falta una rejilla: entre 34px y 44.8px no hay ningún paso con más
    de 3 usos.
13. Tamaños de fuente: 19 pasos con vecinos casi iguales (13 / 13.3 / 13.5 / 14px;
    16 / 16.5px). Los nombres (`font.size.600` = 13px) son ordinales y no dicen nada del
    papel ni del tamaño.
14. Radios: 8, 9, 10, 11, 12, 13, 14, 16 y 18px. Existen `radius.10` (999px) y `radius.full`
    (9999px) para lo mismo, y `report.json` da `"full"` como valor de `radius.full` mientras
    que `tokens.json` da 9999px.
15. `nearDuplicates` detecta pares casi iguales (`#dfe3f0` / `#e4e7f2`, `#fbfbfe` /
    `#ffffff`), pero los tokens no se fusionan ni se marcan.
16. `font.lineHeight.7`, `font.size.1300` y `space.18` aparecen emparejados con la variable
    `--radius` solo porque valen 18px: el emparejamiento por valor ignora la categoría.

## Límites del visor

- La página y el zoom se piden al visor nativo con el fragmento de la URL (`#page`, `#zoom`,
  `#view=FitH`), que solo se lee al cargar: cada cambio vuelve a montar el `<iframe>`.
- El visor nativo no informa de su posición. La página indicada es la última a la que se
  saltó desde la interfaz; lo dice la nota del panel lateral.
- El total de páginas se lee de los bytes del PDF. Si no se puede (por ejemplo, un PDF
  cifrado), los controles y la lista de páginas no se muestran y el panel lo explica.
- Con `file://` la página no puede leer `ejemplo.pdf`, así que su total (5) está declarado en
  `<html data-sample-pages>` y el botón de descarga pasa a "Abrir aparte" (el navegador
  ignora `download` ahí). Con un PDF elegido del equipo la descarga es real.
- El fondo oscuro alrededor de las páginas es del visor nativo de Chromium y no se puede
  cambiar con tokens.
