# Tabla (`table`)

- Instancias encontradas: 2, en 2 páginas.
- Variantes descritas: 1.
- Referencia que se puede abrir: [table.html](table.html).
- Textos: sustituidos por texto de relleno de la misma longitud.

Las variantes van de la más usada a la menos usada. Implementa primero la primera.

## Variante `table-1`

- Usos: 2, en 2 páginas.
- Etiqueta: `<div>`, rol `grid`.
- Tamaño medido: 696 × 260 px (ventana de 1440 px).
- Elementos internos: 24.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `bottom` | `0px` | — |
| `box-sizing` | `border-box` | — |
| `color` | `rgb(0, 0, 0)` | `--color-text-primary` |
| `cursor` | `auto` | — |
| `display` | `block` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `260px` | — |
| `left` | `0px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `overflow-x` | `hidden` | — |
| `overflow-y` | `hidden` | — |
| `position` | `relative` | — |
| `right` | `0px` | — |
| `text-align` | `start` | — |
| `text-transform` | `none` | — |
| `top` | `0px` | — |
| `white-space` | `normal` | — |
| `width` | `696px` | — |

### Tokens que usan sus elementos internos

`--color-palette-6`, `--color-surface`, `--font-letter-spacing-2`, `--font-letter-spacing-6`, `--font-line-height-5`, `--font-size-200`, `--font-weight-500`, `--font-weight-600`, `--font-weight-700`, `--radius-2`, `--radius-5`, `--radius-6`, `--radius-7`, `--shadow-2`, `--space-2`, `--space-3`, `--space-5`

### Estados

Ninguna regla de estado de las hojas de estilo leídas afecta a este elemento.

### Estados de sus elementos internos

| Elemento | Estado | Propiedad | Valor | Token |
|---|---|---|---|---|
| `<button>` nº 1 | pulsado | `background-color` | `rgb(239, 239, 239)` | `--color-palette-14` |
| `<button>` nº 1 | deshabilitado | `color` | `rgb(102, 102, 102)` | `--color-text-secondary` |
| `<button>` nº 1 | deshabilitado | `cursor` | `not-allowed` | — |
| `<button>` nº 1 | ratón encima | `background-color` | `rgb(220, 220, 220)` | `--color-palette-13` |
| `<button>` nº 2 | foco por teclado | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — |
| `<button>` nº 2 | ratón encima | `text-decoration-line` | `underline` | — |

### Transición

Sin transición declarada.

### Estructura

```html
<div role="grid">
  <div role="row">
    <div role="gridcell">
      <div>
        <div>
          <div>
            <button type="button">
              <span>
                L
                Lorem
              </span>
              <div>
                <!-- svg 12px × 12px -->
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div role="gridcell">
      <div>
        <button type="button">
          <div>
            <div></div>
            <div data-state="closed">
              <button>
                <span>
                  <span>
                    Lorem ipsum dol
                  </span>
                </span>
              </button>
              <div>
                <div>
                  <!-- img 382.9px × 212px -->
                </div>
                <div>
                  <div></div>
                  <div>
                    <button data-state="closed">
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- … sigue en el HTML de referencia -->
```
