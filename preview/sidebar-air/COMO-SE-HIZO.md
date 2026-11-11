# Cómo se hizo el sidebar de ejemplo

Run de origen: `runs/20261111-013633-2f4ac1` (5 pantallas internas de la aplicación analizada).
`tokens.css` se genera con `node preview/sidebar-air/build-tokens.mjs runs/20261111-013633-2f4ac1`
(86 propiedades, idéntico al de la galería). `index.html` usa 58 de ellas.

La vista es un ejemplo. No usa el nombre, el logotipo ni los iconos del sitio (los 20 iconos son
trazos propios), los nombres de sección son genéricos y no contiene ningún texto de la cuenta con
la que se hizo el run. No se abrió el sitio ni ninguna otra dirección de red: todo sale de
`report.json`, `tokens.json` y las cinco capturas.

## Resumen: cuánto se pudo reconstruir

El extractor no captura interacción, pero deja una pista que no se había aprovechado: cada token
de `report.json` guarda selectores de ejemplo, y esos selectores llevan las clases completas de
cada elemento, incluidas las que describen estados (`hover:`, `focus-visible:`,
`data-[selected=true]:`, `group-data-[pinned]`, `duration-200`…). Leyéndolas se reconstruye buena
parte del comportamiento sin haberlo visto nunca en marcha.

De los 43 rasgos que la vista etiqueta:

| Etiqueta | Total | Partes visibles | Comportamientos |
|---|---|---|---|
| **Medido** | 6 (14 %) | 6 | 0 |
| **Deducido** | 21 (49 %) | 7 | 14 |
| **Inventado** | 16 (37 %) | 6 | 10 |

Ningún comportamiento es medido. Lo deducido se reparte así: 10 con seguridad alta (hay una clase
que lo describe de forma explícita), 3 con seguridad media y 1 con seguridad baja.

Criterio de las etiquetas:

- **Medido**: el valor está en un token o en una variable CSS del run y, además, el run lo
  registra sobre ese mismo elemento o la captura lo muestra pintado.
- **Deducido**: sale de una captura o de una clase de un selector. Cuando el *valor* es medido
  pero *dónde y cuándo se aplica* se sabe solo por una clase (el hover, el foco), la etiqueta es
  Deducido y se indica el valor medido.
- **Inventado**: no hay evidencia en el run.

## Lo que el encargo daba por sabido y no era exacto

1. **El panel secundario no estaba cerrado en las cinco pantallas.** `--sidebar-width` y
   `--left-nav-width` valen `0px` en cuatro y `272px` en una (la del tablero), y la captura de esa
   pantalla muestra el panel abierto. Gracias a eso hay aspecto real del panel.
2. **Los 150 ms no son del carril.** `transition-opacity duration-150` está en el texto del nombre
   del espacio de trabajo; `animation-duration-150` está en el panel lateral derecho. El carril,
   sus elementos, el velo y las secciones plegables usan `duration-200 ease-out`.
3. **El carril, casi con seguridad, no usa etiquetas emergentes.** Cada enlace lleva dentro un
   texto oculto (`max-w-0 opacity-0`) que se muestra cuando el carril se ensancha. Por eso la vista
   resuelve "etiqueta al pasar el ratón o enfocar" expandiendo el carril, no con un rótulo flotante.
4. **El cambio de espacio de trabajo no está dentro del carril.** En las capturas está en la
   cabecera, encima de la columna del carril, y así se ha maquetado.

## Pistas nuevas encontradas en el run

Todas en los selectores de `report.json` salvo la primera.

- `--sidebar-width: 272px` en 1 de 5 páginas (arriba). También `--workspace-agent-panel-slot-width: 404px`.
- Contenedor del carril: `group/main-side-nav … transition-[width] duration-200 ease-out
  motion-reduce:transition-none w-[60px]`.
- `nav` del carril: `absolute inset-y-0 left-0 z-50 … border-r … pt-3
  transition-[width,box-shadow,border-radius] duration-200 ease-out … w-[60px] shadow-none
  has-[[data-state=open]]:w-58 has-[[data-state=open]]:rounded-r-12 has-[[data-state=open]]:shadow-popover`.
  Es decir: con un menú abierto dentro, el carril pasa a `w-58`, redondea su lado derecho y gana sombra.
- Enlaces y textos del carril: variantes `group-data-[hover-expand]/main-side-nav:` y
  `group-data-[pinned]/main-side-nav:`. Existen, por tanto, un estado "expandido por hover" y un
  estado "fijado".
- Enlace del carril: `h-9 w-[60px]`, fondo en un `::before` con `left-3 right-3 rounded-8` que pasa de
  `opacity-0` a `opacity-100`; `hover:before:bg-hover-subtle`, `hover:text-primary`;
  `data-[selected=true]:before:bg-subtle`, `data-[selected=true]:font-medium`;
  `focus-visible:ring-2 focus-visible:ring-inset ring-focus`.
- Velo: `absolute inset-0 z-[45] bg-black/10 opacity-0 transition-opacity duration-200
  pointer-events-none`, visible con `group-has-[[data-hover-expand]]` o con
  `[data-main-side-nav] [data-state=open]`. El token `color.palette.1` (`#0000001a`) se midió justo ahí.
- Cuenta: `group-data-[state=open]/account:ring-2 … ring-…-9/30` alrededor del avatar.
- Botón del espacio de trabajo: flecha con `w-0 opacity-0 transition-[margin,opacity,width]` y
  `group-hover:w-3.5`, `group-focus-visible:w-3.5`, `group-data-[state=open]:w-3.5`.
- Panel secundario: `group/sub-side-nav-section-header` con acciones `opacity-0` que aparecen con
  `group-hover`, `group-focus-within` y `group-data-[menu-open=true]`; elementos
  `group/workspace-sidebar-navigation-item h-8 rounded-8 px-2.5 pl-[18px]`; secciones plegables
  `grid transition-[grid-template-rows] duration-200 ease-out grid-rows-[1fr]` y `grid-rows-[0fr]`.
- Hay además estados de arrastrar y soltar en el panel (`data-[dnd-dragging=true]:opacity-50`,
  `data-[dnd-over=true]…:ring-2`). No se han reproducido.
- Cabecera: `h-16 ui2026:h-14`. Insignia en píldora dentro de un enlace: `rounded-full h-4 px-1.5
  text-10 font-bold uppercase tracking-wide`.

## Procedencia, rasgo a rasgo

Estas dos tablas son la misma lista que pinta el control «Procedencia» de la vista (mismos
identificadores, mismo orden, misma etiqueta); se comprobó con un script.

### Partes (se marcan con contorno sobre el sidebar)

| id | Tipo | Etiqueta | Rasgo | De dónde sale |
|---|---|---|---|---|
| `carril` | Parte | **Medido** | Carril de 60 px, fondo blanco y borde derecho | `--main-side-nav-width: 60px` (5 de 5 páginas); `color.surface`; `color.palette.15` (`#efefefcc`) registrado sobre el propio `nav`; relleno superior `space.7` (12px) también sobre el `nav`. |
| `item-activo` | Parte | **Medido** | Elemento activo: fondo gris, texto oscuro, peso 500 | `color.palette.16` (`#f6f6f6`, igual a `--air-background-subtle`), `color.palette.2`, `font.weight.500`. Se ve pintado en las cinco capturas. |
| `avatar` | Parte | **Medido** | Avatar circular con iniciales | `color.palette.8` (`#9640ff`), `color.surface`, `font.size.100`, `font.lineHeight.1`, `font.letterSpacing.4`, `font.weight.700`, `radius.full`, todos registrados sobre el botón de cuenta. Las iniciales de la vista son otras. El diámetro (24px, `space.12`) se estimó en la captura. |
| `espacio` | Parte | **Medido** | Botón del espacio de trabajo: tipografía y color | `font.size.300`, `font.lineHeight.6`, `font.letterSpacing.3`, `font.weight.500`, `color.palette.2`; flecha `color.palette.9`. El distintivo es un dibujo propio (cuadro `color.primary` con una letra), no el del sitio. |
| `panel` | Parte | **Medido** | Panel secundario de 272 px | `--sidebar-content-width: 272px` (5 de 5); `--sidebar-width: 272px` en la página que lo tenía abierto. El borde derecho se dedujo de la captura. |
| `velo` | Parte | **Medido** | Velo sobre el contenido (negro al 10 %) | `color.palette.1` (`#0000001a`), registrado sobre el propio elemento del velo. |
| `item` | Parte | **Deducido** | Elemento del carril: alto 36 px, fondo con margen de 12 px y radio 8 | Clases `h-9`, `before:left-3 before:right-3`, `before:rounded-8`. Seguridad alta en la forma; el paso a px supone 4 px por unidad. El color en reposo sí es medido (`color.text.secondary`, `#666666` = `--air-text-metadata`). |
| `separadores` | Parte | **Deducido** | Separadores finos entre grupos | Captura. Seguridad alta en que existen; el color (`color.palette.14`) y el largo son a ojo. |
| `utilidades` | Parte | **Deducido** | Grupo de utilidades anclado abajo | Captura y clases `py-2.5 gap-0.5` (con `space.6` y `space.2` registrados sobre esa sección). Seguridad alta. Qué utilidades son, inventado. |
| `insignia` | Parte | **Deducido** | Insignia en píldora junto a una etiqueta | Clases `rounded-full h-4 px-1.5 text-10 font-bold uppercase`; `font.letterSpacing.5` registrado ahí. Seguridad alta en el aspecto; solo se ve con el carril expandido. |
| `panel-buscador` | Parte | **Deducido** | Buscador en la cabecera del panel | Captura: la primera fila del panel es una búsqueda. Seguridad media: en el sitio parece un botón que abre otra cosa, aquí es un campo. |
| `panel-seccion` | Parte | **Deducido** | Cabeceras de sección del panel | Captura y clases `sub-side-nav-section-header min-h-6 gap-1 py-1 pr-1`. Seguridad alta. |
| `panel-item` | Parte | **Deducido** | Elementos del panel: alto 32 px, radio 8, sangría 18 px | Clases `h-8 rounded-8 px-2.5 pl-[18px]`; `space.10` (18px) registrado sobre esos enlaces. Seguridad alta. |
| `iconos` | Parte | **Inventado** | Iconos: dibujos propios y genéricos | Decisión del encargo. Solo el color y el tamaño (16px, clase `size-4`) vienen del run. |
| `fijar-carril` | Parte | **Inventado** | Botón «Fijar barra» y su posición | El estado fijado existe (`data-pinned`), pero el run no muestra con qué control se activa. |
| `panel-cabecera` | Parte | **Inventado** | Título del panel con botones de fijar y cerrar | Sin evidencia. En la captura el panel no tiene título ni botones. |
| `menu-espacio` | Parte | **Inventado** | Menú del espacio de trabajo: aspecto y contenido | Solo consta que el botón abre algo (`group-data-[state=open]`). Borde, radio y sombra se eligieron por analogía (`color.palette.13`, `radius.5`, `shadow.4`). |
| `menu-usuario` | Parte | **Inventado** | Menú de usuario: aspecto y contenido | Igual que el anterior. |
| `movil-boton` | Parte | **Inventado** | Botón de navegación en móvil | Sin evidencia: el run solo tiene un ancho de ventana. |

### Comportamientos (solo en la leyenda)

| id | Tipo | Etiqueta | Rasgo | De dónde sale |
|---|---|---|---|---|
| `c-expandir-menu` | Comportamiento | **Deducido** | El carril se expande a 232 px, con etiquetas, sombra y esquinas, cuando hay un menú abierto dentro | Clases `has-[[data-state=open]]:w-58`, `:rounded-r-12`, `:shadow-popover`. Seguridad alta. Los 232 px suponen 4 px por unidad; la sombra real no se extrajo y se usa `shadow.4`. |
| `c-expandir-hover` | Comportamiento | **Deducido** | El carril se expande al pasar el ratón | Atributo `data-hover-expand` en las clases del carril y del velo. Seguridad media: no se sabe sobre qué zona exacta hay que pasar. |
| `c-fijar-carril` | Comportamiento | **Deducido** | El carril puede quedar fijado en su forma expandida | Atributo `data-pinned`, con las mismas reglas que el hover. Seguridad media: que fijado empuje el contenido se infiere de que el contenedor también anima su `width`. |
| `c-velo` | Comportamiento | **Deducido** | El velo aparece mientras el carril flota expandido | Clases `group-has-[[data-hover-expand]]…:opacity-100` y `group-has-[[data-main-side-nav]_[data-state=open]]…:opacity-100`. Seguridad alta. |
| `c-transicion` | Comportamiento | **Deducido** | Transiciones de 200 ms con salida suave en carril, velo y elementos | Clases `duration-200 ease-out`. Seguridad alta en la duración; la curva `cubic-bezier(0, 0, 0.2, 1)` es la habitual de esa clase, no un valor leído. |
| `c-movimiento-reducido` | Comportamiento | **Deducido** | Sin transición con movimiento reducido | Clase `motion-reduce:transition-none` en el carril. Seguridad alta. La vista lo extiende a todo. |
| `c-hover` | Comportamiento | **Deducido** | Hover: fondo #efefef y texto oscuro | Clases `hover:before:bg-hover-subtle`, `hover:text-primary`; valor medido `--air-background-hover-subtle: #efefef` (= `color.palette.14`). Seguridad alta. La misma clase lleva una alternativa (`hover:before:bg-gray-2`, `#fbfbfa`); no se puede saber cuál gana sin ver el estado. |
| `c-foco` | Comportamiento | **Deducido** | Foco: anillo interior de 2 px #0563e9 | Clases `focus-visible:ring-2 focus-visible:ring-inset ring-focus`; valor medido `--air-focus-ring: #0563e9`. Seguridad alta. |
| `c-flecha-espacio` | Comportamiento | **Deducido** | La flecha del espacio de trabajo aparece con hover, foco o menú abierto | Clases `group-hover:w-3.5`, `group-focus-visible:w-3.5`, `group-data-[state=open]:w-3.5`, `transition-[margin,opacity,width]`. Seguridad alta. |
| `c-anillo-avatar` | Comportamiento | **Deducido** | Anillo azul al 30 % en el avatar con su menú abierto | Clase `group-data-[state=open]/account:ring-2 …-9/30`. Seguridad alta. |
| `c-panel-seccion` | Comportamiento | **Deducido** | El panel depende de la sección: unas lo tienen y otras no | `--sidebar-width` vale 272px en 1 página y 0px en 4. Seguridad media: podría depender de una preferencia y no de la página. |
| `c-panel-animacion` | Comportamiento | **Deducido** | El panel se abre animando su anchura en 150 ms | Clases `animate-width-in`, `animate-width-out` y `animation-duration-150`, que están en *otro* panel (el derecho). Seguridad baja. |
| `c-secciones-plegables` | Comportamiento | **Deducido** | Secciones del panel plegables en 200 ms | Clases `transition-[grid-template-rows] duration-200 ease-out` con `grid-rows-[1fr]` y `grid-rows-[0fr]`. Seguridad alta. |
| `c-acciones-cabecera` | Comportamiento | **Deducido** | Las acciones de una cabecera aparecen con hover o foco | Clases `group-hover/sub-side-nav-section-header:opacity-100` y `group-focus-within/…:opacity-100`. Seguridad alta. |
| `c-retardo-hover` | Comportamiento | **Inventado** | Espera de 250 ms antes de expandir con el ratón | Sin evidencia. Se añadió para que el carril no salte al cruzarlo. |
| `c-expandir-foco` | Comportamiento | **Inventado** | El carril se expande al entrar con el teclado | Sin evidencia. Sin esto, quien navega con teclado no vería las etiquetas. |
| `c-flechas` | Comportamiento | **Inventado** | Una sola parada de Tab en el carril; flechas, Inicio y Fin dentro | Sin evidencia. |
| `c-escape` | Comportamiento | **Inventado** | Escape cierra lo último abierto | Sin evidencia. Orden: menú, capa móvil, panel flotante, carril expandido. |
| `c-atajo` | Comportamiento | **Inventado** | Ctrl/⌘ + B pliega el panel | Sin evidencia. En móvil abre y cierra la capa. |
| `c-menus-teclado` | Comportamiento | **Inventado** | Menús: flechas, Inicio, Fin, Escape y clic fuera | Sin evidencia en el run; es la convención de este tipo de menú. |
| `c-panel-cerrar-fijar` | Comportamiento | **Inventado** | Cerrar el panel, o soltarlo para que flote y se cierre solo | Sin evidencia. Lo pedía el encargo; en el sitio lo que consta que se fija es el carril. |
| `c-panel-reabrir` | Comportamiento | **Inventado** | Pulsar la sección activa pliega o despliega su panel | Sin evidencia. |
| `c-buscador` | Comportamiento | **Inventado** | El buscador filtra los elementos del panel | Sin evidencia. |
| `c-movil` | Comportamiento | **Inventado** | En móvil, carril y panel son una capa deslizante con velo | Sin evidencia. Corte en 820px, elegido a mano. |

## Valores fuera de los tokens

Están en tres bloques `:root` al principio de `index.html`. Fuera de ellos no hay ningún color,
tamaño de fuente, radio, sombra, familia ni medida en px escritos a mano.

**1. Variables CSS del sitio sin token equivalente** (huecos del extractor):

| Propiedad de la vista | Valor | Variable de origen |
|---|---|---|
| `--site-main-side-nav-width` | 60px | `--main-side-nav-width` |
| `--site-sidebar-content-width` | 272px | `--sidebar-content-width` (y `--sidebar-width` en 1 página) |
| `--site-focus-ring` | `#0563e9` | `--air-focus-ring`. El azul de acento que sí es token es otro (`color.palette.7`, `#034bff`). |

Comprobado antes de añadirlas: `#efefef` (`--air-background-hover-subtle`) ya es `color.palette.14`
y `#c1c1c1` (`--air-border-hover-input`) ya es `color.palette.11`; se usan los tokens.

**2. Valores leídos en nombres de clase** (ni token ni variable; pistas):

| Propiedad de la vista | Valor | Clase de origen |
|---|---|---|
| `--class-rail-expanded-width` | 232px | `w-58`, suponiendo 4 px por unidad |
| `--class-rail-item-height` | 36px | `h-9`, mismo supuesto |
| `--class-header-height` | 56px | `ui2026:h-14`, mismo supuesto (la captura da unos 56 px) |
| `--class-duration-200` | 200ms | `duration-200` |
| `--class-duration-150` | 150ms | `duration-150`, `animation-duration-150` |
| `--class-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | `ease-out`; la curva es la habitual de la clase, supuesta |

**3. Solo maquetación**: `--layout-menu-width` (208px), `--layout-content-max` (960px),
`--layout-card-min` (208px), `--layout-card-height` (128px), `--layout-legend-source-min` (180px),
el corte `@media (max-width: 820px)`, `0`, porcentajes, `fr`, `z-index`, `opacity` 0 y 1, el giro
de 90° de la flecha de sección, `0s` en los retardos de `visibility`, el `30%` del anillo del
avatar (de la clase `/30`) y las palabras `transparent`, `currentColor`, `inherit` y `none`.
En el script, dos separaciones de 12 y 4 px para colocar el menú de usuario y la espera de 250 ms.

Los tres colores del control «Procedencia» son tokens reutilizados para un papel que el sitio no
tiene: `color.palette.10` (verde), `color.palette.7` (azul) y `color.palette.8` (violeta). Se
distinguen también por el trazo (continuo, discontinuo, punteado) y por la letra M, D o I.

## Qué habría que capturar

Capacidades concretas que le faltan al extractor, ordenadas por lo que habrían ahorrado aquí.

1. **Estados por interacción.** Para cada elemento interactivo, provocar hover, foco de teclado y
   pulsación, y guardar la diferencia de estilos calculados respecto al reposo. Habría convertido
   en medidos el hover, el foco, la flecha del espacio de trabajo y las acciones de cabecera, y
   habría resuelto cuál de las dos variantes de hover se aplica.
2. **Reglas CSS de estado sin interactuar.** Leer de las hojas de estilo las reglas con `:hover`,
   `:focus-visible`, `[data-state=open]`, `[data-selected]`, `:has(...)` que afectan a cada
   elemento. Es más barato que lo anterior y da los valores exactos (232 px, la sombra del carril
   expandido, el anillo del avatar) en vez de nombres de clase que hay que interpretar.
3. **Transiciones y animaciones.** `transition-property`, `-duration`, `-timing-function` y
   `-delay` calculados, y los `@keyframes` referenciados. Hoy las duraciones se leen en nombres de
   clase y las curvas se suponen.
4. **Captura de menús y capas abiertas.** Pulsar los disparadores (`aria-haspopup`,
   `aria-expanded`) y capturar lo que aparece: tokens, posición respecto al disparador y captura
   de pantalla. Los dos menús de esta vista son inventados enteros por no tenerlo.
5. **Secuencia temporal de una interacción.** Capturas o medidas de anchura a intervalos mientras
   el carril se abre: daría el retardo antes de expandirse, que hoy es inventado, y confirmaría si
   empuja el contenido o flota.
6. **Geometría.** Rectángulo de cada elemento estructural (ancho, alto, posición). Los 36 px del
   elemento, los 56 px de la cabecera y los 24 px del avatar son deducciones; con el rectángulo
   serían medidas. Hoy `width` y `height` no se extraen y `space` mezcla rellenos, márgenes y
   separaciones.
7. **Variables CSS con su ámbito.** Guardar en qué elemento se declara cada variable y qué reglas
   la consumen. `--sidebar-width` aparece con dos valores y solo se sabe en qué página, no por qué.
8. **Varios anchos de ventana.** Repetir la extracción a 390 y 768 px y leer los `@media` de las
   hojas de estilo. Todo el comportamiento móvil de esta vista es inventado.
9. **Teclado.** Recorrer con Tab y registrar el orden de foco, los `tabindex`, los roles y
   atributos ARIA, y los atajos declarados (`aria-keyshortcuts`, textos de ayuda). Las flechas,
   Escape y el atajo son inventados.
10. **Sombras con nombre y capas.** La sombra `shadow-popover` no llegó a ser token porque ningún
    elemento la pintaba en reposo; tampoco se extrae `z-index`, aunque las clases dicen `z-50` para
    el carril y `z-[45]` para el velo.
11. **Pseudoelementos.** El fondo de hover y de activo del carril vive en un `::before`, que el
    extractor no mide; se conoce solo por las clases.

Con solo el punto 2 (leer reglas, sin interactuar) casi todo lo deducido pasaría a medido. Para lo
inventado hacen falta los puntos 4, 5, 8 y 9, que sí exigen manejar la aplicación en vivo. No se
hizo: el encargo lo excluía.

## Límites de la vista

- El estado vive en memoria; al recargar vuelve a «Inicio» con el carril plegado.
- La expansión por hover se imita con un atributo que pone el script tras 250 ms; en una pantalla
  táctil no hay hover y el carril solo muestra etiquetas dentro de la capa móvil cuando el panel
  está cerrado. Con el panel abierto en móvil, los iconos del carril no tienen texto visible (sí
  nombre accesible).
- En móvil no se puede fijar ni el carril ni el panel: esos botones se ocultan.
- «Importar», «Papelera», «Ayuda», las entradas de los menús y el «+» de las cabeceras no hacen
  nada salvo anunciarlo a lectores de pantalla.
- Ctrl + B puede estar reservado por algún navegador; se probó en Chromium.
- No se reproducen el arrastrar y soltar del panel ni el panel lateral derecho del sitio.
- Inter no se descarga: si el equipo no la tiene, se ve la siguiente familia de la pila. Las
  capturas de verificación se hicieron sin Inter instalada.
- No se probó con un lector de pantalla.
