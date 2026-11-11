# Paquete de entrega

Generado por el Explorador de estilos web a partir de 5 páginas recorridas.
Sirve para construir en otro proyecto vistas con el mismo lenguaje visual.

## Qué contiene

- `tokens.css`: 86 propiedades CSS, una por token. `tokens.json` es lo mismo en formato DTCG 2025.10.
- `components/<tipo>.md`: una ficha por componente (17). Medidas, estilos con su token, estados y estructura.
- `components/<tipo>.html`: la referencia de ese componente, que se abre en el navegador sin servidor.
- `elements.md`: inventario de todas las etiquetas HTML encontradas.
- `PROMPT.md`: el encargo listo para dárselo a un agente; solo hay que rellenar qué vista se quiere y con qué tecnología.
- `check.mjs`: comprueba que una vista ya hecha usa los tokens (`node check.mjs <carpeta de la vista>`).
- `index.html`: todas las referencias en una sola página.

## Cómo implementarlo

1. Carga `tokens.css` en el proyecto de destino. Todo color, tamaño de fuente, espaciado, radio y sombra se escribe como `var(--…)`.
2. Implementa los componentes en este orden: estructura (barra lateral, cabecera, navegación), controles (botón, campo, selector), contenido (títulos, párrafos, tablas, tarjetas).
3. Para cada componente, abre su `.html` como modelo y sigue su ficha `.md`: primero la variante 1, que es la más usada.
4. Copia la estructura y los tokens, no el HTML literal: los estilos en línea de la referencia son una medición, no una forma de escribir código.
5. Los estados (ratón encima, foco, pulsado, seleccionado) están en la tabla "Estados" de cada ficha. Si la tabla está vacía, no se pudo leer ninguno: no lo inventes sin avisar.
6. Si necesitas un valor que no existe como token, no lo inventes: es un hueco, anótalo.

## Componentes

| Componente | Usos | Variantes | Ficha | Referencia |
|---|---|---|---|---|
| Cabecera | 14 | 5 | [header.md](components/header.md) | [header.html](components/header.html) |
| Navegación | 10 | 2 | [nav.md](components/nav.md) | [nav.html](components/nav.html) |
| Aviso o confirmación | 5 | 1 | [alert.md](components/alert.md) | [alert.html](components/alert.html) |
| Pestañas | 4 | 2 | [tabs.md](components/tabs.md) | [tabs.html](components/tabs.html) |
| Tabla | 2 | 1 | [table.md](components/table.md) | [table.html](components/table.html) |
| Lista | 4 | 1 | [list.md](components/list.md) | [list.html](components/list.html) |
| Formulario | 1 | 1 | [form.md](components/form.md) | [form.html](components/form.html) |
| Botón | 168 | 6 | [button.md](components/button.md) | [button.html](components/button.html) |
| Enlace | 60 | 6 | [link.md](components/link.md) | [link.html](components/link.html) |
| Campo de texto | 2 | 2 | [input.md](components/input.md) | [input.html](components/input.html) |
| Selector | 4 | 2 | [select.md](components/select.md) | [select.html](components/select.html) |
| Etiqueta de campo | 3 | 3 | [label.md](components/label.md) | [label.html](components/label.html) |
| Título | 6 | 4 | [heading.md](components/heading.md) | [heading.html](components/heading.html) |
| Párrafo | 87 | 6 | [paragraph.md](components/paragraph.md) | [paragraph.html](components/paragraph.html) |
| Imagen | 99 | 6 | [image.md](components/image.md) | [image.html](components/image.html) |
| Icono | 223 | 6 | [icon.md](components/icon.md) | [icon.html](components/icon.html) |
| Separador | 1 | 1 | [separator.md](components/separator.md) | [separator.html](components/separator.html) |

## Lo que no está

- No apareció en ninguna página recorrida: Diálogo o modal, Casilla. El explorador no pulsa nada, así que solo ve lo que está abierto al cargar. Para estos componentes no hay medición.
- Los estados salen de las reglas CSS del sitio, no de usarlo. No hay tiempos de espera, teclado ni comportamiento en móvil.
- Los iconos y las imágenes no se copian: la referencia muestra un recuadro punteado de su tamaño.
- Textos: sustituidos por relleno, porque el recorrido usó una sesión iniciada.
- Medidas tomadas con una ventana de 1440 × 900 px.

## Cortes de ancho que usa el sitio

- `(max-width: 400px), (max-height: 550px)`
- `(min-width: 1040px)`
- `(min-width: 1104px)`
- `(min-width: 1280px)`
- `(min-width: 1400px) and (min-height: 900px)`
- `(min-width: 1760px) and (min-height: 1040px)`
- `(min-width: 375px)`
- `(min-width: 560px)`
- `(min-width: 700px)`
- `(min-width: 920px)`
