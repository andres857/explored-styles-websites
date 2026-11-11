# Pestañas (`tabs`)

- Instancias encontradas: 4, en 4 páginas.
- Variantes descritas: 2.
- Referencia que se puede abrir: [tabs.html](tabs.html).
- Textos: sustituidos por texto de relleno de la misma longitud.

Las variantes van de la más usada a la menos usada. Implementa primero la primera.

## Variante `tabs-1`

- Usos: 3, en 3 páginas.
- Etiqueta: `<div>`, rol `tablist`.
- Tamaño medido: 968 × 34 px (ventana de 1440 px).
- Elementos internos: 8.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `align-items` | `center` | — |
| `border-bottom-color` | `rgb(239, 239, 239)` | `--color-palette-14` |
| `border-bottom-style` | `solid` | — |
| `border-bottom-width` | `1px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(0, 0, 0)` | `--color-text-primary` |
| `cursor` | `auto` | — |
| `display` | `flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `34px` | — |
| `justify-content` | `space-between` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `padding-left` | `24px` | `--space-12` |
| `padding-right` | `16px` | `--space-9` |
| `text-align` | `start` | — |
| `text-transform` | `none` | — |
| `white-space` | `normal` | — |
| `width` | `968px` | — |

### Tokens que usan sus elementos internos

`--color-palette-2`, `--color-palette-6`, `--color-palette-7`, `--font-line-height-5`, `--font-size-200`, `--font-weight-600`, `--radius-2`, `--space-11`, `--space-3`, `--space-5`

### Estados

Ninguna regla de estado de las hojas de estilo leídas afecta a este elemento.

### Estados de sus elementos internos

| Elemento | Estado | Propiedad | Valor | Token |
|---|---|---|---|---|
| `<button>` nº 1 | `data-disabled` | `cursor` | `not-allowed` | — |
| `<button>` nº 1 | `data-disabled` | `opacity` | `0.45` | — |
| `<button>` nº 2 | `data-disabled` | `cursor` | `not-allowed` | — |
| `<button>` nº 2 | `data-disabled` | `opacity` | `0.45` | — |
| `<button>` nº 2 | `data-state=active` | `border-bottom-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<button>` nº 3 | pulsado | `background-color` | `rgb(239, 239, 239)` | `--color-palette-14` |
| `<button>` nº 3 | deshabilitado | `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `<button>` nº 3 | deshabilitado | `cursor` | `not-allowed` | — |
| `<button>` nº 3 | ratón encima | `background-color` | `rgb(220, 220, 220)` | `--color-palette-13` |

### Transición

Sin transición declarada.

### Estructura

```html
<div role="tablist">
  <div>
    <button type="button" role="tab" aria-selected="true" data-state="active">
      <div>
        Lorem ipsum
      </div>
    </button>
    <button type="button" role="tab" aria-selected="false" data-state="inactive">
      <div>
        Lorem ipsuma
      </div>
    </button>
  </div>
  <div data-state="closed">
    <button type="button" aria-expanded="false" data-state="closed">
      Lorem ipsu
      <div>
        <!-- svg 12px × 12px -->
      </div>
    </button>
  </div>
</div>
```

## Variante `tabs-2`

- Usos: 1, en 1 página.
- Etiqueta: `<div>`, rol `tablist`.
- Tamaño medido: 130 × 33 px (ventana de 1440 px).
- Elementos internos: 6.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `box-sizing` | `border-box` | — |
| `color` | `rgb(0, 0, 0)` | `--color-text-primary` |
| `cursor` | `auto` | — |
| `display` | `flex` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `33px` | — |
| `justify-content` | `space-between` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `text-align` | `start` | — |
| `text-transform` | `none` | — |
| `white-space` | `normal` | — |
| `width` | `130px` | — |

### Tokens que usan sus elementos internos

`--color-palette-2`, `--color-palette-7`, `--color-text-secondary`, `--font-line-height-5`, `--font-size-200`, `--font-weight-600`, `--radius-2`, `--space-11`, `--space-3`, `--space-4`, `--space-5`

### Estados

Ninguna regla de estado de las hojas de estilo leídas afecta a este elemento.

### Estados de sus elementos internos

| Elemento | Estado | Propiedad | Valor | Token |
|---|---|---|---|---|
| `<button>` nº 1 | `data-disabled` | `cursor` | `not-allowed` | — |
| `<button>` nº 1 | `data-disabled` | `opacity` | `0.45` | — |
| `<button>` nº 1 | `data-state=inactive` | `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `<button>` nº 2 | `data-disabled` | `cursor` | `not-allowed` | — |
| `<button>` nº 2 | `data-disabled` | `opacity` | `0.45` | — |
| `<button>` nº 2 | `data-state=active` | `border-bottom-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<button>` nº 2 | `data-state=active` | `color` | `rgb(32, 32, 32)` | `--color-palette-2` |

### Transición

Sin transición declarada.

### Estructura

```html
<div role="tablist">
  <div>
    <button type="button" role="tab" aria-selected="true" data-state="active">
      <div>
        Lorem i
      </div>
    </button>
    <button type="button" role="tab" aria-selected="false" data-state="inactive">
      <div>
        <span>
          Lorem ip
        </span>
      </div>
    </button>
  </div>
</div>
```
