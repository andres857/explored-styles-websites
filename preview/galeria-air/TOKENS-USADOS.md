# Tokens usados en la galería de imágenes (run de la aplicación de trabajo)

Run de origen: `runs/20261111-013633-2f4ac1` (5 pantallas internas de la aplicación analizada).
`tokens.css` se genera con `node preview/galeria-air/build-tokens.mjs runs/20261111-013633-2f4ac1`
y contiene 86 propiedades, una por token. `index.html` usa 60 de ellas.

La vista es un ejemplo: no usa el nombre, el logotipo ni los iconos del sitio analizado (los 20
iconos son trazos propios) y no contiene ningún texto de la cuenta con la que se hizo el run.
Las 23 imágenes de `imagenes/` se crearon por código (17 SVG y 6 PNG); sus colores son contenido,
no interfaz. `imagenes/manifest.js` es su catálogo.

Los papeles ya resueltos en `preview/visor-pdf-air/TOKENS-USADOS.md` se reutilizan tal cual. Entre
paréntesis, los usos que `report.json` cuenta para cada token en el sitio original.

## Color

| Papel en la galería | Token | Valor | Nota |
|---|---|---|---|
| Fondo de la ventana y del visor ampliado, detrás de los paneles | `color.palette.14` (68) | `#efefef` | Igual que en el visor de PDF. |
| Paneles, tarjetas, campo de búsqueda, texto sobre el botón principal y sobre casillas marcadas | `color.surface` (630) | `#ffffff` | |
| Botón "Añadir imágenes" y filtros activos (etiqueta o formato pulsados) | `color.primary` (36) | `#00276d` | El sitio usa este azul marino también en botones pequeños. |
| Hover de lo anterior | `color.palette.3` (4) | `#001d52` | |
| Texto principal: título de sección, nombres de imagen, valores del panel de datos | `color.palette.2` (179) | `#202020` | No se usa `color.text.primary` (`#000000`). |
| Texto de botones secundarios, elementos de navegación, celdas de la tabla, párrafos de estado; hover del borde de la casilla | `color.palette.6` (352) | `#4d4d4d` | |
| Metadatos (medidas y fecha), contadores, cabeceras de tabla, texto de ayuda, iconos en reposo, marcador del campo de búsqueda | `color.text.secondary` (518) | `#666666` | Sobre blanco da 5,74:1; sobre `#f6f6f6`, 5,31:1. |
| Bordes de botones, campos, etiquetas y barra de selección; separadores verticales | `color.palette.13` (212) | `#dcdcdc` | |
| Borde bajo las cabeceras y sobre la nota de la barra lateral | `color.palette.15` (16) | `#efefefcc` | |
| Borde de las tarjetas en reposo, líneas de la tabla, borde de la barra de herramientas, hover de botones y de navegación, cuadro del icono de estado, segundo paso del esqueleto de carga | `color.palette.14` (68) | `#efefef` | |
| Fondo de miniaturas, de botones secundarios, del elemento de navegación activo, de la tarjeta y la fila seleccionadas, del área de la imagen ampliada y del esqueleto de carga | `color.palette.16` (147) | `#f6f6f6` | |
| Hover de las filas de la tabla y fondo de la nota del visor | `color.palette.17` (17) | `#fbfbfa` | |
| Hover del borde de botones, tarjetas y campos; controles desactivados | `color.palette.11` (76) | `#c1c1c1` | |
| Borde de la casilla sin marcar | `color.palette.9` (45) | `#808080` | Se eligió por contraste: con `palette.11` el borde quedaba en 1,8:1. |
| Foco de teclado, borde y anillo de la tarjeta seleccionada, marca de la fila seleccionada, casilla marcada, estrella de favorita, marca de la sección activa, enlace "Limpiar", borde de la capa al arrastrar | `color.palette.7` (10) | `#034bff` | Único azul de acento disponible; carga con seis papeles distintos. |
| Botón de contorno de los estados vacíos; hover del enlace "Limpiar" | `color.palette.4` (7) | `#0204a4` | |
| Punto de los avisos ("3 imágenes añadidas") | `color.palette.10` (4) | `#46a758` | |
| Fondo translúcido de lo que va sobre la miniatura (casilla, botón de favorita) y velo al arrastrar archivos | `color.palette.19` (1) | `#ffffffd9` | Un solo uso en el sitio; es su "cristal". |
| Velo tras la barra lateral en móvil | `color.palette.1` (9) | `#0000001a` | Negro al 10 %; en el sitio es justo una capa de superposición. Es el único velo oscuro que hay. |

No se usan `color.text.primary`, `color.palette.5`, `.8`, `.12` ni `.18`.

## Tipografía

| Papel | Token | Valor |
|---|---|---|
| Toda la interfaz | `font.family.body` (1224) | Inter y su pila |
| Título de la sección | `font.size.500` (8) + `font.lineHeight.9` (4) + `font.letterSpacing.1` (8) + `font.weight.600` | 24px / 32px / -0.5px. Es el título de página del sitio. |
| Texto base, botones, navegación, nombres, tabla, panel de datos | `font.size.300` (682) + `font.lineHeight.6` (677) + `font.letterSpacing.3` (682) | 14px / 20px / -0.1px |
| Nombre de la imagen en el visor, títulos de estado | `font.size.400` (1170) + `font.lineHeight.7` (1168) + `font.letterSpacing.2` (36) | 16px / 24px / -0.2px |
| Metadatos de tarjeta, contadores, etiquetas, cabeceras de tabla, notas | `font.size.200` (469) + `font.lineHeight.3` (99) o `font.lineHeight.5` (376) | 12px / 16px o 18px |
| Rótulos "Colecciones", "Etiquetas", "Formato" | `font.size.200` + `font.letterSpacing.5` (9) + `font.weight.600` | 12px, 0.3px, mayúsculas |
| Insignia "Vista de ejemplo" | `font.size.100` (20) + `font.lineHeight.1` (14) + `font.letterSpacing.5` | 10px / 12px / 0.3px |
| Pesos | `font.weight.400` (1715), `.500` (129), `.600` (490) | texto; nombres y elemento activo; botones y títulos |

## Radio, sombra y espacio

| Papel | Token | Valor |
|---|---|---|
| Paneles, tarjetas, barra de selección, capa al arrastrar, borde de la capa lateral en móvil | `radius.5` (59) | 12px |
| Botones, campos, miniaturas, elementos de navegación, cuadro de icono | `radius.4` (193) | 8px |
| Etiquetas, casillas, miniaturas de la lista, imagen ampliada | `radius.2` (123) | 4px |
| Insignia y líneas del esqueleto de carga | `radius.1` (20) | 2px |
| Botón de favorita, puntos, marca de sección activa | `radius.full` (27) | 9999px |
| Hover de tarjeta e imagen ampliada | `shadow.5` (87) | `0 2px 8px #0000000a` |
| Barra de selección, capa lateral en móvil, rótulo al arrastrar | `shadow.4` (5) | la sombra de elementos flotantes |
| Ancho de borde; anillo de la tarjeta seleccionada | `space.1` (48) | 1px |
| Grosor del foco, del trazo de iconos, de las marcas de activo y de fila seleccionada | `space.2` (49) | 2px |
| Separaciones y rellenos | `space.3`, `.4`, `.5`, `.6`, `.7`, `.9`, `.12` | 4, 6, 8, 10, 12, 16, 24px |
| Tamaño de icono, alto de insignia, separación de la cuadrícula | `space.9` (203) | 16px |
| Casilla de selección | `space.11` (10) | 20px |
| Alto de etiquetas, botón de favorita | `space.12` (12) | 24px |
| Alto de botones, campos y elementos de navegación | `space.13` (8) | 32px |
| Miniatura de la lista, cuadro del icono de estado, columna de la casilla | `space.15` (1) | 40px |
| Columnas de favorita y de miniatura de la tabla | `space.17` (1), `space.18` (19) | 44px, 58px |
| Margen superior de los estados; hueco inferior cuando hay barra de selección | `space.19` (1), `space.20` (2) | 64px, 96px |

El anillo de selección de la tarjeta es `box-shadow: 0 0 0 var(--space-1) var(--color-palette-7)`:
se compone con dos tokens porque ninguna de las cinco sombras sirve de anillo.

## Valores fuera de los tokens

Solo maquetación: las doce medidas `--layout-*` (barra lateral 248px, plegada 56px, capa móvil
288px, panel de datos 320px, ancho mínimo de tarjeta 208px y 148px en móvil, búsqueda 280px,
estado 420px, columnas de la tabla 88/128/184px, columna de rótulos del panel de datos 96px,
cabecera 56px), los cortes `@media` (1100px,
820px y 821px), la proporción `4 / 3` de la miniatura, `0`, porcentajes, `fr`, las duraciones
(120 ms, 160 ms, 1200 ms), `z-index`, `opacity: 0` y `1` para mostrar y ocultar los controles
sobre la miniatura, y las palabras clave `transparent`, `currentColor`, `inherit` y `none`.

## Huecos del extractor que aparecen con una galería

Los 16 huecos anotados en el visor de PDF siguen vigentes. Estos son nuevos o cambian de peso.

**Estados de selección**

1. No hay ningún token de "seleccionado": ni fondo tintado, ni borde, ni color de casilla. Las
   pantallas recorridas no tenían nada seleccionado y, de las 411 variables `--air-*` de
   `report.json`, ninguna lleva "select" en el nombre. La galería usa el azul de acento
   (`palette.7`, 10 usos) para el borde y el gris `palette.16` para el fondo: el mismo gris que el
   elemento de navegación activo y que el fondo de las miniaturas, así que hubo que cambiar el
   fondo de la miniatura a blanco dentro de una tarjeta seleccionada para que se distinguiera.
2. `palette.7` acaba con seis papeles (foco, selección, casilla, favorita, sección activa,
   enlace). Un extractor que capturase estados daría un color por papel; aquí hay uno solo y con
   pocos usos, de modo que la regla "prefiere tokens con muchos usos" no se puede cumplir para
   nada interactivo.
3. Controles de formulario: no hay tokens para casillas (tamaño, borde, color al marcar) ni se
   extrae `accent-color`. El color del texto de ayuda de un campo (`::placeholder`) tampoco se
   mide: los pseudoelementos quedan fuera. Se usó `color.text.secondary`.
4. Estado "pulsado" de un filtro: no existe. Se resolvió con `color.primary`.

**Superposiciones sobre imagen**

5. Velo oscuro. El sitio declara `--air-surface-overlay` y `--air-effects-scrim-60`
   (`rgba(15,15,15,.6)`), pero ninguna pantalla recorrida los pintaba, así que no son token. El
   único negro translúcido es `palette.1` (10 %), demasiado débil para un visor a pantalla
   completa. Por eso el visor ampliado no es una capa oscura: es otro juego de paneles blancos
   sobre el gris de la aplicación.
6. Controles encima de una imagen. Solo hay un blanco translúcido útil (`palette.19`, 1 uso).
   No hay degradado de protección, ni color de texto sobre imagen, ni sombra de texto. La galería
   evita poner texto sobre las miniaturas.
7. Fondo para imágenes con transparencia (tablero de cuadros o similar): no hay nada; las
   miniaturas van sobre `palette.16` liso.
8. Opacidad: sigue sin ser una categoría. Mostrar la casilla y la estrella solo al pasar el
   cursor se hace con `opacity` 0 y 1 escritos a mano.

**Rejillas y tamaños**

9. La cuadrícula no sale de ningún token: ancho mínimo de tarjeta, número de columnas,
   proporción de la miniatura y cortes de pantalla son `--layout-*`. El extractor no mide
   `grid-template-columns`, `aspect-ratio`, `width` ni los `@media` del sitio, aunque una de las
   pantallas recorridas era justo una cuadrícula de tarjetas.
10. La separación de la cuadrícula (16px) se eligió entre los pasos de `space` por recuento, pero
    `gap` se cuenta mezclado con márgenes y rellenos: no se puede saber qué separación usa el
    sitio entre tarjetas.
11. Tamaños de miniatura, casilla y botón redondo salen de `space` (`space.11`, `.12`, `.15`),
    que no promete ser una escala de tamaños. `space.15` (40px) y `space.17` (44px) tienen 1 uso.

**Densidad**

12. No hay altura de fila ni de control. La tabla se armó con relleno `space.4` más una miniatura
    de 40px (filas de unos 53px); no hay forma de saber si el sitio es más compacto.
13. No hay estilo de cabecera de tabla ni de fila (hover, alterna): ninguna pantalla recorrida
    tenía tabla. El hover de fila usa `palette.17` y el de tarjeta `palette.11` + `shadow.5` por
    analogía.
14. La relación entre tamaños de texto y sus alturas de línea se vuelve a deducir a mano, ahora
    también para 24px (se emparejó con 32px y -0.5px por los selectores de ejemplo).

**Otros**

15. Color de aviso y de acción destructiva. El sitio declara una escala ámbar y
    `--air-*-warning`, además de las de error, pero nada de eso se pintaba. La estrella de
    favorita es azul y "Eliminar definitivamente" es un botón neutro.
16. Movimiento: duraciones y curvas no se extraen (el sitio usa `duration-200` en sus
    selectores). Las transiciones de la galería llevan valores escritos a mano.
17. Capas: no hay `z-index` ni niveles de elevación; se sabe que hay dos sombras, no qué va
    encima de qué.
18. Esqueleto de carga: no hay pareja de colores para la animación; se alterna entre
    `palette.16` y `palette.14` por elección propia.

## Límites de la galería

- El estado vive en memoria: al recargar vuelve a las 23 imágenes de muestra. Lo dice la nota de
  la barra lateral.
- Con `file://` la página no puede leer el tamaño de los archivos de muestra: medidas, peso,
  fecha, etiquetas y colección están declarados en `imagenes/manifest.js`. De las imágenes
  añadidas desde el equipo sí se leen el peso (del archivo) y las medidas (al decodificarlas).
- Las imágenes añadidas entran sin etiquetas y con la fecha del momento. No se pueden renombrar
  ni etiquetar, ni crear colecciones: esos controles no existen en la vista.
- El estado de carga dura como mínimo 400 ms por imagen para que llegue a verse; la lectura
  local es casi instantánea.
- "Eliminar definitivamente" no pide confirmación.
- Recientes son las 8 últimas por fecha. Con dos etiquetas activas se exige que la imagen tenga
  ambas; con dos formatos, cualquiera de los dos.
- El visor ampliado no hace zoom. Recorre las imágenes en el orden de la sección abierta y da la
  vuelta al llegar al final.
- Cada tarjeta tiene tres paradas de tabulación (abrir, seleccionar, favorita); no hay navegación
  con flechas dentro de la cuadrícula.
- Por debajo de 1100px la tabla oculta Formato y Colección; por debajo de 820px muestra medidas y
  fecha bajo el nombre y la barra lateral pasa a ser una capa.
- Inter no se descarga: si el equipo no la tiene, se ve la siguiente familia de la pila.
