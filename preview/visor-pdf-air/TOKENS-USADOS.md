# Tokens usados en el visor de PDF (run de la aplicación de trabajo)

Run de origen: `runs/20261111-013633-2f4ac1` (5 pantallas internas de app.air.inc, recorridas con
sesión iniciada). `tokens.css` se genera con
`node preview/visor-pdf-air/build-tokens.mjs runs/20261111-013633-2f4ac1` y contiene 86
propiedades, una por token. `index.html` usa 49 de ellas.

La vista es un ejemplo: no usa el nombre, el logotipo ni los iconos del sitio analizado (los
iconos son trazos propios) y no contiene ningún texto de la cuenta con la que se hizo el run.

Entre paréntesis, los usos que `report.json` cuenta para cada token en el sitio original.

## Color

| Papel en el visor | Token | Valor | Por qué |
|---|---|---|---|
| Fondo de la ventana, detrás de los paneles flotantes | `color.palette.14` (68) | `#efefef` | En las capturas la aplicación son paneles blancos redondeados sobre un gris. Ese gris es este token (lo lleva el contenedor de la maquetación), no `color.surface`. |
| Paneles, cabecera, hoja del documento, texto sobre el botón principal | `color.surface` (630) | `#ffffff` | Rol correcto como "superficie de panel". No es el fondo que se ve entre paneles. |
| Botón principal ("Descargar") | `color.primary` (36) | `#00276d` | Comprobado en `report.json`: 36 usos en 4 páginas, coincide con las variables `--air-background-agentic` y `--air-agentic-9`. Es el azul marino de los botones principales. Rol correcto. |
| Hover del botón principal | `color.palette.3` (4) | `#001d52` | Pocos usos, pero coincide con `--air-background-hover-agentic`. |
| Texto principal: títulos, nombre del documento, valores | `color.palette.2` (179) | `#202020` | Es `--air-text-primary`. No se usa `color.text.primary`; ver huecos. |
| Texto de botones secundarios, párrafos de los estados, elementos de la lista | `color.palette.6` (352) | `#4d4d4d` | Es `--air-text-secondary`. |
| Metadatos, notas, etiquetas de la ficha, iconos en reposo | `color.text.secondary` (518) | `#666666` | El nombre promete "texto secundario"; en el sitio es `--air-text-metadata` / `--air-icon-default`. Se usa como metadato. |
| Bordes de botones, tarjeta y aviso; separadores verticales | `color.palette.13` (212) | `#dcdcdc` | `--air-border-input`. Es el borde de los botones secundarios del sitio. |
| Borde bajo la cabecera y a la derecha del panel de páginas | `color.palette.15` (16) | `#efefefcc` | Es exactamente el borde de la cabecera y de la barra lateral del sitio (gris 4 al 80 %). |
| Borde de la barra del documento y de la hoja; hover de botones; insignia; cuadro del icono de estado | `color.palette.14` (68) | `#efefef` | `--air-border-default` y `--air-background-hover-subtle`. |
| Fondo de botones secundarios, del área del documento, de la página activa y del esqueleto de carga | `color.palette.16` (147) | `#f6f6f6` | `--air-background-subtle`. |
| Fondo de la zona de arrastre y del aviso inferior | `color.palette.17` (17) | `#fbfbfa` | `--air-surface-raised`; en el sitio acompaña a los bordes discontinuos. |
| Borde discontinuo de la zona de arrastre, hover del borde de botones, controles desactivados, punto de estado inactivo | `color.palette.11` (76) | `#c1c1c1` | `--air-border-hover-input`; el sitio lo usa en bordes discontinuos e iconos tenues. |
| Foco de teclado, marca de la página activa, borde de la capa al arrastrar | `color.palette.7` (10) | `#034bff` | Azul de las pestañas activas y de los anillos de foco (`ring-blue-9` en los selectores). |
| Botón de contorno de los estados vacío y de error | `color.palette.4` (7) | `#0204a4` | Es el botón de contorno azul del estado vacío del sitio. Solo aparece en 1 página. |
| Punto de "documento abierto" | `color.palette.10` (4) | `#46a758` | El punto verde de estado del panel derecho del sitio. |
| Viñetas de la lista de la tarjeta | `color.palette.9` (45) | `#808080` | Gris de iconos tenues. |
| Velo de la capa al arrastrar | `color.palette.19` (1) | `#ffffffd9` | Un solo uso, pero es `--air-surface-glass`: el único blanco translúcido útil como velo. |

## Tipografía

| Papel | Token | Valor |
|---|---|---|
| Toda la interfaz | `font.family.body` (1224) | Inter y su pila |
| Texto base, botones, lista de páginas, ficha | `font.size.300` (682) + `font.lineHeight.6` (677) + `font.letterSpacing.3` (682) | 14px / 20px / -0.1px |
| Nombre del documento, títulos de estado y de tarjeta | `font.size.400` (1170) + `font.lineHeight.7` (1168) + `font.letterSpacing.2` (36) | 16px / 24px / -0.2px |
| Metadatos, notas, lecturas de página y zoom, etiqueta "Páginas" | `font.size.200` (469) + `font.lineHeight.3` (99) o `font.lineHeight.5` (376) | 12px / 16px o 18px |
| Insignias | `font.size.100` (20) + `font.lineHeight.1` (14) + `font.letterSpacing.5` (9) | 10px / 12px / 0.3px, mayúsculas |
| Pesos | `font.weight.400` (1715), `.500` (129), `.600` (490) | texto; títulos de estado y elemento activo; botones y títulos |

Los emparejamientos tamaño/altura/espaciado se dedujeron de los recuentos (14px, -0.1px y 20px
tienen casi los mismos usos) y de los selectores de ejemplo. `tokens.json` no los relaciona.

No se usan `font.size.500` (24px, el título de página del sitio), `font.weight.700` ni
`font.family.1`: un visor no necesita un título de 24px y la segunda familia es la misma Inter
con otra pila de respaldo.

## Radio, sombra y espacio

| Papel | Token | Valor | Por qué |
|---|---|---|---|
| Paneles flotantes, tarjeta, zona de arrastre | `radius.5` (59) | 12px | El de los paneles y las tarjetas del sitio. |
| Botones, elementos de la lista, hoja del documento, aviso, cuadro de icono | `radius.4` (193) | 8px | El más usado; es el de los botones. |
| Insignias y líneas del esqueleto de carga | `radius.1` (20) | 2px | El sitio lo usa justo en sus esqueletos de carga. |
| Puntos y marca de página activa | `radius.full` (27) | 9999px | |
| Hoja del documento | `shadow.5` (87) | `0 2px 8px #0000000a` | La sombra suave de las tarjetas apiladas del sitio. |
| Panel de páginas en móvil (capa) y etiqueta de la capa al arrastrar | `shadow.4` (5) | `0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a` | La sombra de los elementos flotantes del sitio. |
| Ancho de borde | `space.1` (48) | 1px | No hay tokens de ancho de borde. |
| Grosor del foco, del trazo de iconos, de la marca activa | `space.2` (49) | 2px | |
| Separaciones y rellenos | `space.3`, `.4`, `.5`, `.7`, `.9`, `.12` | 4, 6, 8, 12, 16, 24px | Todos con 12 usos o más. |
| Alto de botones y elementos de lista | `space.13` (8) | 32px | No hay tokens de tamaño de control; 32px existe como espacio. |
| Cuadro del icono de estado, alto de la etiqueta al arrastrar | `space.15` (1) | 40px | Un solo uso; no hay otro paso entre 34 y 42px. |
| Tamaño de iconos y alto de insignia | `space.9` (203) | 16px | No hay tokens de tamaño de icono. |

## Valores fuera de los tokens

Solo maquetación, como permite el encargo: `--layout-top: 56px`, `--layout-docbar: 48px`,
`--layout-pages: 232px`, `--layout-details: 340px`, `--layout-state: 420px`,
`--layout-drawer: 264px`, `--layout-term: 88px`, los cortes `@media` (1180px y 820px), `0`,
porcentajes, `fr`, `ch`, `100dvh`, las duraciones (120 ms, 1200 ms, 4 s), `z-index`, y las
palabras clave `transparent`, `currentColor`, `inherit` y `none`.

## Huecos del extractor

Encontrados al construir una pantalla real con este run.

**Roles mal asignados**

1. `color.text.primary` es `#000000` (982 usos), pero el texto que se ve en las capturas es
   `#202020` (`color.palette.2`, que coincide con `--air-text-primary`). El negro gana por
   recuento porque es el color heredado del `body` y de contenedores sin texto propio. Contar
   el color de todos los elementos, y no solo de los que pintan texto, da un rol equivocado.
2. `color.text.secondary` es `#666666`, que en el sitio es el color de metadatos e iconos. El
   texto secundario real (`#4d4d4d`, `--air-text-secondary`, 352 usos) quedó como
   `color.palette.6`.
3. `color.surface` es `#ffffff`, el fondo del `body`, pero el fondo que el usuario ve entre
   paneles es `#efefef` (`color.palette.14`). Con aplicaciones hechas de paneles flotantes, "el
   fondo del body" no es "el fondo de la aplicación".
4. `color.primary` es correcto en este run (`#00276d`). No hay, en cambio, rol para el azul de
   acento de pestañas, enlaces y foco (`#034bff`, `palette.7`) ni para los bordes
   (`palette.13`, 212 usos).
5. `report.json` ya trae en `matchingVariables` los nombres semánticos del sitio
   (`--air-text-primary`, `--air-border-input`, `--air-background-subtle`…) para 19 de los 86
   tokens. El nombrado no los aprovecha: todos esos colores salen como `palette.N`.

**Tokens que faltan**

6. Color de error. El sitio declara `--air-text-error`, `--air-background-error` y
   `--air-border-error`, pero ninguna pantalla recorrida los pinta, así que no llegan a
   `tokens.json`. El estado de error del visor es neutro.
7. Estados. No se capturan `:hover`, `:focus-visible` ni `:disabled`. El sitio declara
   `--air-focus-ring` (`#0563e9`), que no es ningún token; el foco del visor usa `palette.7`.
   Los hover salen de tokens que por suerte coinciden con variables `…-hover-…`.
8. Opacidad y velos oscuros. No hay token de opacidad; los controles desactivados cambian de
   color en vez de atenuarse.
9. Anchos de borde, tamaños de icono y altos de control: no existen como categoría. Se usan
   pasos de `space`.
10. Relación entre tokens tipográficos (qué altura de línea y qué espaciado van con cada
    tamaño). Hay que deducirla.

**Escalas que no ayudan**

11. Sombras: de 5 tokens, solo 2 son sombras. `shadow.1` es totalmente transparente (equivale
    a `none`), `shadow.2` y `shadow.3` son anillos de foco de 0px o transparentes, y las dos
    útiles (`shadow.4`, `shadow.5`) arrastran dos capas transparentes delante. Son los
    marcadores de posición `--tw-ring-shadow` de Tailwind; el extractor debería quitar las
    capas con alfa 0 y descartar la sombra si no queda ninguna.
12. Espacios: `baseUnit` es `null` y los nombres son ordinales (`space.9` = 16px), aunque el
    77 % de los usos son múltiplos de 4 y el 96 % son pares. La regla cuenta valores distintos
    (12 de 24 son múltiplos de 4), no usos. La cola de la escala es maquetación, no espacio:
    `109px`, `222px`, `294px`.
13. Radios: `radius.3` (6px), `radius.6` (16px) y `radius.7` (18px) tienen 1 uso cada uno y
    ensucian una escala que en realidad es 2 / 4 / 8 / 12 / full.
14. Grises casi iguales: `#efefef`, `#f6f6f6`, `#fbfbfa` y `#ffffff` aparecen en
    `nearDuplicates` (deltaE < 2) y aun así los cuatro tienen papeles distintos en el sitio.
    Aquí no fusionarlos es lo correcto; el aviso de "casi duplicado" es engañoso para
    interfaces que se apoyan en diferencias sutiles de gris.
15. `font.family.1` y `font.family.body` son la misma fuente (Inter) con pilas de respaldo
    distintas, y la primera repite `system-ui`, `-apple-system` y `Roboto` dentro de la pila.
16. Los nombres ordinales (`palette.13`, `space.9`, `font.size.300`) cambian si otro recorrido
    encuentra un valor más: no son estables entre runs del mismo sitio.

## Límites del visor

- La página y el zoom se piden al visor nativo con el fragmento de la URL (`#page`, `#zoom`,
  `#view=FitH`), que solo se lee al cargar: cada cambio vuelve a montar el `<iframe>`.
- El visor nativo no informa de su posición. La página indicada es la última pedida desde la
  interfaz; lo dicen el panel de páginas y el panel de detalles.
- No hay miniaturas, solo lista de páginas por número: el visor nativo no las expone y el
  encargo excluye pdf.js. La interfaz lo dice.
- El total de páginas se lee de los bytes del PDF. Si no se puede (por ejemplo, un PDF
  cifrado), los controles y la lista de páginas no se muestran y el panel lo explica.
- Con `file://` la página no puede leer `ejemplo.pdf`, así que su total de páginas (4) y su
  tamaño (28 054 bytes) están declarados en `<html data-sample-pages data-sample-bytes>`, y el
  botón principal pasa a "Abrir aparte" (el navegador ignora `download` ahí). Con un PDF
  elegido del equipo la descarga es real.
- El panel de detalles se oculta por debajo de 1180px. Por debajo de 820px el panel de páginas
  pasa a ser una capa sobre el documento y empieza plegado.
- El marco oscuro alrededor de las páginas es del visor nativo de Chromium y no se puede
  cambiar con tokens.
- Inter no se descarga: si el equipo no la tiene, se ve la siguiente familia de la pila.
