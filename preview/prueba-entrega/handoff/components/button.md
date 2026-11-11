# Botón (`button`)

- Instancias encontradas: 168, en 5 páginas.
- Variantes descritas: 6 (otras 27 menos usadas no se detallan).
- Referencia que se puede abrir: [button.html](button.html).
- Textos: sustituidos por texto de relleno de la misma longitud.

Las variantes van de la más usada a la menos usada. Implementa primero la primera.

## Variante `button-1`

- Usos: 32, en 4 páginas.
- Etiqueta: `<button>`.
- Tamaño medido: 101 × 24 px (ventana de 1440 px).
- Elementos internos: 1.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `background-color` | `rgb(0, 39, 109)` | `--color-primary` |
| `border-bottom-left-radius` | `4px` | `--radius-2` |
| `border-bottom-right-radius` | `4px` | `--radius-2` |
| `border-top-left-radius` | `4px` | `--radius-2` |
| `border-top-right-radius` | `4px` | `--radius-2` |
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(255, 255, 255)` | `--color-surface` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `flex-shrink` | `0` | — |
| `font-family` | `Inter, system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | `--font-family-1` |
| `font-size` | `12px` | `--font-size-200` |
| `font-style` | `normal` | — |
| `font-weight` | `600` | `--font-weight-600` |
| `height` | `24px` | — |
| `justify-content` | `center` | — |
| `left` | `0px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `18px` | `--font-line-height-5` |
| `padding-left` | `8px` | `--space-5` |
| `padding-right` | `8px` | `--space-5` |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `center` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `transition-duration` | `0.15s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | — |
| `white-space` | `normal` | — |
| `width` | `101px` | — |

### Tokens que usan sus elementos internos

`--space-3`

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| pulsado | `background-color` | `rgb(0, 29, 82)` | `--color-palette-3` | `var(--color-agentic-blue-hover)` |
| deshabilitado | `background-color` | `rgb(246, 246, 246)` | `--color-palette-16` | `rgba(var(--colors-gray-3-rgb),var(--tw-bg-opacity,1))` |
| deshabilitado | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |
| deshabilitado | `cursor` | `not-allowed` | — | `not-allowed` |
| ratón encima | `background-color` | `rgb(0, 29, 82)` | `--color-palette-3` | `var(--color-agentic-blue-hover)` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.15s` · `cubic-bezier(0.4, 0, 0.2, 1)`

### Estructura

```html
<button type="button">
  Lorem ipsuma
  <div>
    <!-- svg 12px × 12px -->
  </div>
</button>
```

## Variante `button-2`

- Usos: 28, en 4 páginas.
- Etiqueta: `<button>`.
- Tamaño medido: 24 × 24 px (ventana de 1440 px).
- Elementos internos: 1.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `border-bottom-left-radius` | `4px` | `--radius-2` |
| `border-bottom-right-radius` | `4px` | `--radius-2` |
| `border-top-left-radius` | `4px` | `--radius-2` |
| `border-top-right-radius` | `4px` | `--radius-2` |
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(77, 77, 77)` | `--color-palette-6` |
| `cursor` | `pointer` | — |
| `display` | `flex` | — |
| `flex-shrink` | `0` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `12px` | `--font-size-200` |
| `font-style` | `normal` | — |
| `font-weight` | `600` | `--font-weight-600` |
| `height` | `24px` | — |
| `justify-content` | `center` | — |
| `left` | `0px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `18px` | `--font-line-height-5` |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `center` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `transition-duration` | `0.15s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | — |
| `white-space` | `nowrap` | — |
| `width` | `24px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| pulsado | `background-color` | `rgb(239, 239, 239)` | `--color-palette-14` | `rgba(var(--colors-gray-4-rgb),var(--tw-bg-opacity,1))` |
| deshabilitado | `color` | `rgb(102, 102, 102)` | `--color-text-secondary` | `rgba(var(--colors-gray-10-rgb),var(--tw-text-opacity,1))` |
| deshabilitado | `cursor` | `not-allowed` | — | `not-allowed` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.15s` · `cubic-bezier(0.4, 0, 0.2, 1)`

### Estructura

```html
<button type="button" aria-expanded="false" data-state="closed">
  <span>
    Lorem ipsum dolor s
  </span>
  <!-- svg 16px × 16px -->
</button>
```

## Variante `button-3`

- Usos: 25, en 5 páginas.
- Etiqueta: `<button>`.
- Tamaño medido: 60 × 36 px (ventana de 1440 px).
- Elementos internos: 3.

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

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.2s` · `cubic-bezier(0, 0, 0.2, 1)`

### Estructura

```html
<button type="button">
  <span>
    <span>
      <span>
        <!-- svg 16px × 16px -->
      </span>
    </span>
  </span>
</button>
```

## Variante `button-4`

- Usos: 12, en 4 páginas.
- Etiqueta: `<button>`.
- Tamaño medido: 295 × 34 px (ventana de 1440 px).
- Elementos internos: 3.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `background-color` | `rgb(255, 255, 255)` | `--color-surface` |
| `border-bottom-color` | `rgba(0, 0, 0, 0)` | — |
| `border-bottom-left-radius` | `8px` | `--radius-4` |
| `border-bottom-right-radius` | `8px` | `--radius-4` |
| `border-bottom-style` | `solid` | — |
| `border-bottom-width` | `1px` | — |
| `border-left-color` | `rgba(0, 0, 0, 0)` | — |
| `border-left-style` | `solid` | — |
| `border-left-width` | `1px` | — |
| `border-right-color` | `rgba(0, 0, 0, 0)` | — |
| `border-right-style` | `solid` | — |
| `border-right-width` | `1px` | — |
| `border-top-color` | `rgba(0, 0, 0, 0)` | — |
| `border-top-left-radius` | `8px` | `--radius-4` |
| `border-top-right-radius` | `8px` | `--radius-4` |
| `border-top-style` | `solid` | — |
| `border-top-width` | `1px` | — |
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(0, 0, 0)` | `--color-text-primary` |
| `cursor` | `pointer` | — |
| `display` | `inline-flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | `--font-family-1` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `gap` | `4px` | `--space-3` |
| `height` | `34px` | — |
| `left` | `0px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `padding-bottom` | `4px` | `--space-3` |
| `padding-left` | `8px` | `--space-5` |
| `padding-right` | `12px` | `--space-7` |
| `padding-top` | `4px` | `--space-3` |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `left` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `transition-duration` | `0.15s` | — |
| `transition-property` | `color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` | — |
| `transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` | — |
| `white-space` | `normal` | — |
| `width` | `295px` | — |

### Tokens que usan sus elementos internos

`--color-palette-6`, `--font-line-height-3`, `--font-size-200`, `--font-weight-500`

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| deshabilitado | `cursor` | `not-allowed` | — | `not-allowed` |
| deshabilitado | `opacity` | `0.45` | — | `0.45` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| foco por teclado | `outline-color` | `rgba(0, 0, 0, 0)` | — | `transparent` |
| foco por teclado | `outline-offset` | `2px` | — | `2px` |
| foco por teclado | `outline-style` | `solid` | — | `solid` |
| foco por teclado | `outline-width` | `2px` | — | `2px` |

### Transición

`color, background-color, border-color, -webkit-text-decoration-color, text-decoration-color, fill, stroke` · `0.15s` · `cubic-bezier(0.4, 0, 0.2, 1)`

### Estructura

```html
<button type="button">
  <span>
    <!-- svg 16px × 16px -->
  </span>
  <span>
    <span>
      Lorem ipsum dolor sit amet consectetur a
    </span>
    <!-- svg 12px × 12px -->
  </span>
</button>
```

## Variante `button-5`

- Usos: 9, en 4 páginas.
- Etiqueta: `<button>`, rol `tab`.
- Tamaño medido: 51 × 34 px (ventana de 1440 px).
- Elementos internos: 1.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `border-bottom-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `border-bottom-style` | `solid` | — |
| `border-bottom-width` | `2px` | — |
| `border-top-color` | `rgba(0, 0, 0, 0)` | — |
| `border-top-style` | `solid` | — |
| `border-top-width` | `2px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(32, 32, 32)` | `--color-palette-2` |
| `cursor` | `pointer` | — |
| `display` | `block` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `12px` | `--font-size-200` |
| `font-style` | `normal` | — |
| `font-weight` | `600` | `--font-weight-600` |
| `height` | `34px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `18px` | `--font-line-height-5` |
| `margin-bottom` | `-1px` | — |
| `text-align` | `center` | — |
| `text-transform` | `none` | — |
| `white-space` | `normal` | — |
| `width` | `51px` | — |

### Tokens que usan sus elementos internos

`--radius-2`, `--space-3`, `--space-5`

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| `data-disabled` | `cursor` | `not-allowed` | — | `not-allowed` |
| `data-disabled` | `opacity` | `0.45` | — | `0.45` |
| `data-state=inactive` | `color` | `rgb(102, 102, 102)` | `--color-text-secondary` | `rgba(var(--colors-gray-10-rgb),var(--tw-text-opacity,1))` |

### Transición

Sin transición declarada.

### Estructura

```html
<button type="button" role="tab" aria-selected="true" data-state="active">
  <div>
    Lorem i
  </div>
</button>
```

## Variante `button-6`

- Usos: 5, en 5 páginas.
- Etiqueta: `<button>`.
- Tamaño medido: 36 × 36 px (ventana de 1440 px).
- Elementos internos: 0.

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
| `flex-shrink` | `0` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `36px` | — |
| `justify-content` | `center` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `text-align` | `center` | — |
| `text-transform` | `none` | — |
| `white-space` | `normal` | — |
| `width` | `36px` | — |

### Estados

| Estado | Propiedad | Valor | Token | Escrito en el sitio como |
|---|---|---|---|---|
| pulsado | `background-color` | `rgb(251, 251, 250)` | `--color-palette-17` | `rgba(var(--colors-gray-2-rgb),var(--tw-bg-opacity,1))` |
| foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — | `var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)` |
| ratón encima | `background-color` | `rgb(251, 251, 250)` | `--color-palette-17` | `rgba(var(--colors-gray-2-rgb),var(--tw-bg-opacity,1))` |
| ratón encima | `color` | `rgb(32, 32, 32)` | `--color-palette-2` | `rgba(var(--colors-gray-12-rgb),var(--tw-text-opacity,1))` |

### Transición

Sin transición declarada.

### Estructura

```html
<button type="button" data-state="closed">
  <!-- svg 16px × 16px -->
</button>
```
