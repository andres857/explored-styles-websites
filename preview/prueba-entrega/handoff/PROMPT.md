# Encargo para un agente

Antes de entregarlo, sustituye las tres marcas `<<…>>`.

## Objetivo

Construir: una vista de aplicación SaaS cuyo protagonista es la barra lateral: un carril estrecho de iconos con navegación principal por grupos, utilidades y avatar abajo, y un panel secundario que se abre junto al carril con la subnavegación de la sección elegida y un buscador. A la derecha, una cabecera y unas tarjetas de relleno. Nombres de sección genéricos (Inicio, Proyectos, Informes…).

Tecnología: HTML, CSS y JavaScript sin dependencias, en un solo `index.html` más `tokens.css`. Debe abrir con file://, sin servidor ni red.

La vista debe parecer hecha por el mismo equipo que hizo el sitio del que salió este paquete.
No es una copia de ninguna de sus pantallas: es una vista nueva con su lenguaje visual.

## Entradas

Esta carpeta, que es de solo lectura. Léela en este orden:

1. `README.md`: qué hay y qué no hay.
2. `tokens.css`: los únicos colores, tamaños de fuente, espaciados, radios y sombras permitidos.
3. Las fichas `components/<tipo>.md` de los componentes que vayas a usar, y su `components/<tipo>.html` como modelo. Ábrelo en un navegador si puedes.
4. `elements.md` si necesitas una etiqueta que no tiene ficha.

Componentes con ficha: `header`, `nav`, `alert`, `tabs`, `table`, `list`, `form`, `button`, `link`, `input`, `select`, `label`, `heading`, `paragraph`, `image`, `icon`, `separator`.

## Salida

Escribe solo dentro de: `/home/andres/Documents/projects/explorador-web-estilos/preview/prueba-entrega/vista/`

Copia `tokens.css` a esa carpeta sin modificarlo y cárgalo desde la vista.

## Reglas

- Todo color, tamaño de fuente, familia, radio y sombra se escribe como `var(--…)` de `tokens.css`. Para el espaciado, usa los tokens `--space-…` siempre que el valor exista.
- Elige el token por lo que dice la ficha del componente, no por su nombre: un nombre como `--color-text-primary` puede no ser el color de texto que el sitio usa de verdad. La columna "Token" de cada ficha es la que manda.
- Usa la variante 1 de cada componente salvo que necesites otra. Respeta su tamaño medido, su relleno y su radio.
- Los estados (ratón encima, foco, pulsado, seleccionado, deshabilitado) salen de las tablas "Estados" de la ficha. Si un componente interactivo no tiene ninguno, dale un foco visible con tokens y dilo en el informe.
- Los anchos de maquetación, las columnas, `0`, `100%`, las duraciones y los cortes de `@media` se pueden escribir a mano. Decláralos como propiedades personalizadas propias en un bloque aparte.
- Si necesitas un valor que no existe como token, no lo inventes en silencio: usa el token más cercano y anótalo como hueco.
- Los recuadros punteados de las referencias son iconos e imágenes que no se copiaron. Dibuja los tuyos, genéricos.
- No copies el HTML de las referencias: sus estilos en línea son una medición. Escribe el componente como se escribe en la tecnología del proyecto.

## Lo que este paquete no sabe

- No se midió: Diálogo o modal, Casilla. Si la vista lo necesita, constrúyelo con los tokens y con las medidas del componente más parecido, y márcalo en el informe como no medido.
- No hay comportamiento medido: ni teclado, ni móvil, ni tiempos de espera, ni qué abre o cierra cada cosa. Lo que hagas ahí es decisión tuya: dilo.
- Las medidas son de una ventana de 1440 px de ancho.

## Verificación

1. `node check.mjs <carpeta de salida>` (el script está en esta carpeta) debe terminar con 0 problemas. Una excepción justificada se marca con un comentario `handoff-allow` en su línea y se explica en el informe.
2. La vista abre sin errores de consola.
3. No hay desplazamiento horizontal a 1440 px ni a 390 px de ancho.
4. Todo control que se ve, funciona; y se puede usar con teclado con el foco visible.

## Informe final

- Archivos creados.
- Qué componentes del paquete usaste y qué variante de cada uno.
- Resultado de `check.mjs`, con sus cifras.
- Huecos: valores que te faltaron, componentes no medidos que tuviste que construir y comportamiento que decidiste tú.
- Qué le faltó a este paquete para que no tuvieras que suponer.
