# Enlace (`link`)

- Instancias encontradas: 60, en 5 páginas.
- Variantes descritas: 6 (otras 3 menos usadas no se detallan).
- Referencia que se puede abrir: [link.html](link.html).
- Textos: sustituidos por texto de relleno de la misma longitud.

Las variantes van de la más usada a la menos usada. Implementa primero la primera.

## Variante `link-1`

- Usos: 40, en 5 páginas.
- Etiqueta: `<a>`.
- Tamaño medido: 60 × 36 px (ventana de 1440 px).
- Elementos internos: 2.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `flex-shrink` | `0` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `36px` | — |
| `justify-content` | `flow-start` | — |
| `left` | `0px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `overflow-x` | `hidden` | — |
| `overflow-y` | `hidden` | — |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `left` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `transition-duration` | `0.2s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0, 0, 0.2, 1)` | — |
| `white-space` | `normal` | — |
| `width` | `60px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| `data-pinned` | `width` | `0px` | — | `100%` |
| `data-selected=true` | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| `data-selected=true` | `font-weight` | `500` | — | `500` |
| `data-state=open` | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.2s` · `cubic-bezier(0, 0, 0.2, 1)`

### Estructura

```html
<a>
  <span>
    <span>
      <!-- svg 16px × 16px -->
    </span>
  </span>
</a>
```

## Variante `link-2`

- Usos: 5, en 5 páginas.
- Etiqueta: `<a>`.
- Tamaño medido: 157.3 × 32 px (ventana de 1440 px).
- Elementos internos: 0.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `background-color` | `rgb(255, 255, 255)` | `--color-surface` |
| `border-bottom-left-radius` | `8px` | `--radius-4` |
| `border-bottom-right-radius` | `8px` | `--radius-4` |
| `border-top-left-radius` | `8px` | `--radius-4` |
| `border-top-right-radius` | `8px` | `--radius-4` |
| `bottom` | `836px` | — |
| `box-shadow` | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px` | `--shadow-4` |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(32, 32, 32)` | `--color-palette-2` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | `--font-family-1` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `32px` | — |
| `left` | `-9999px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `padding-left` | `10px` | `--space-6` |
| `padding-right` | `10px` | `--space-6` |
| `position` | `absolute` | — |
| `right` | `11281.7px` | — |
| `text-align` | `start` | — |
| `text-transform` | `none` | — |
| `top` | `32px` | — |
| `white-space` | `nowrap` | — |
| `width` | `157.328px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| con foco | `left` | `12px` | — | `calc(0.75rem + anchor(left, 0px))` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

Sin transición declarada.

### Estructura

```html
<a>
  Lorem ipsum dolor si
</a>
```

## Variante `link-3`

- Usos: 5, en 1 página.
- Etiqueta: `<a>`.
- Tamaño medido: 252 × 32 px (ventana de 1440 px).
- Elementos internos: 2.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `border-bottom-left-radius` | `8px` | `--radius-4` |
| `border-bottom-right-radius` | `8px` | `--radius-4` |
| `border-top-left-radius` | `8px` | `--radius-4` |
| `border-top-right-radius` | `8px` | `--radius-4` |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `gap` | `6px` | `--space-4` |
| `height` | `32px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `overflow-x` | `hidden` | — |
| `overflow-y` | `hidden` | — |
| `padding-bottom` | `4px` | `--space-3` |
| `padding-left` | `18px` | `--space-10` |
| `padding-right` | `10px` | `--space-6` |
| `padding-top` | `4px` | `--space-3` |
| `text-align` | `left` | — |
| `text-overflow` | `ellipsis` | — |
| `text-transform` | `none` | — |
| `transition-duration` | `0.15s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | — |
| `white-space` | `nowrap` | — |
| `width` | `252px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| `data-selected=true` | `background-color` | `rgb(246, 246, 246)` | `--color-palette-16` | `rgba(var(--colors-gray-3-rgb),var(--tw-bg-opacity,1))` |
| `data-selected=true` | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| `data-selected=true` | `font-weight` | `500` | — | `500` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `background-color` | `rgb(251, 251, 250)` | `--color-palette-17` | `rgba(var(--colors-gray-2-rgb),var(--tw-bg-opacity,1))` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.15s` · `cubic-bezier(0.4, 0, 0.2, 1)`

### Estructura

```html
<a>
  <span>
    <!-- svg 16px × 16px -->
  </span>
  <span>
    Lorem ipsum do
  </span>
</a>
```

## Variante `link-4`

- Usos: 5, en 5 páginas.
- Etiqueta: `<a>`.
- Tamaño medido: 60 × 36 px (ventana de 1440 px).
- Elementos internos: 2.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(32, 32, 32)` | `--color-palette-2` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `flex-shrink` | `0` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `500` | `--font-weight-500` |
| `height` | `36px` | — |
| `justify-content` | `flow-start` | — |
| `left` | `0px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `overflow-x` | `hidden` | — |
| `overflow-y` | `hidden` | — |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `left` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `transition-duration` | `0.2s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0, 0, 0.2, 1)` | — |
| `white-space` | `normal` | — |
| `width` | `60px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| `data-pinned` | `width` | `0px` | — | `100%` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.2s` · `cubic-bezier(0, 0, 0.2, 1)`

### Estructura

```html
<a>
  <span>
    <span>
      <!-- svg 16px × 16px -->
    </span>
  </span>
</a>
```

## Variante `link-5`

- Usos: 1, en 1 página.
- Etiqueta: `<a>`.
- Tamaño medido: 202 × 20 px (ventana de 1440 px).
- Elementos internos: 2.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `border-bottom-left-radius` | `8px` | `--radius-4` |
| `border-bottom-right-radius` | `8px` | `--radius-4` |
| `border-top-left-radius` | `8px` | `--radius-4` |
| `border-top-right-radius` | `8px` | `--radius-4` |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `flex-basis` | `0%` | — |
| `flex-grow` | `1` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `gap` | `6px` | `--space-4` |
| `height` | `20px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `text-align` | `left` | — |
| `text-transform` | `none` | — |
| `white-space` | `nowrap` | — |
| `width` | `202px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

Sin transición declarada.

### Estructura

```html
<a>
  <span>
    <!-- svg 16px × 16px -->
  </span>
  <span>
    Lorem ipsu
  </span>
</a>
```

## Variante `link-6`

- Usos: 1, en 1 página.
- Etiqueta: `<a>`.
- Tamaño medido: 252 × 32 px (ventana de 1440 px).
- Elementos internos: 2.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `border-bottom-left-radius` | `8px` | `--radius-4` |
| `border-bottom-right-radius` | `8px` | `--radius-4` |
| `border-top-left-radius` | `8px` | `--radius-4` |
| `border-top-right-radius` | `8px` | `--radius-4` |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `14px` | `--font-size-300` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `gap` | `6px` | `--space-4` |
| `height` | `32px` | — |
| `letter-spacing` | `-0.084px` | `--font-letter-spacing-3` |
| `line-height` | `20px` | `--font-line-height-6` |
| `overflow-x` | `hidden` | — |
| `overflow-y` | `hidden` | — |
| `padding-bottom` | `4px` | `--space-3` |
| `padding-left` | `10px` | `--space-6` |
| `padding-right` | `10px` | `--space-6` |
| `padding-top` | `4px` | `--space-3` |
| `text-align` | `left` | — |
| `text-overflow` | `ellipsis` | — |
| `text-transform` | `none` | — |
| `transition-duration` | `0.15s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | — |
| `white-space` | `nowrap` | — |
| `width` | `252px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| `data-selected=true` | `background-color` | `rgb(246, 246, 246)` | `--color-palette-16` | `rgba(var(--colors-gray-3-rgb),var(--tw-bg-opacity,1))` |
| `data-selected=true` | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| `data-selected=true` | `font-weight` | `500` | — | `500` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `background-color` | `rgb(251, 251, 250)` | `--color-palette-17` | `rgba(var(--colors-gray-2-rgb),var(--tw-bg-opacity,1))` |
| ratón encima | `text-decoration-line` | `underline` | — | `underline` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.15s` · `cubic-bezier(0.4, 0, 0.2, 1)`

### Estructura

```html
<a>
  <span>
    <!-- svg 16px × 16px -->
  </span>
  <span>
    Lorem ipsum dolo
  </span>
</a>
```
