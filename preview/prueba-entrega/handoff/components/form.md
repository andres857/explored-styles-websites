# Formulario (`form`)

- Instancias encontradas: 1, en 1 página.
- Variantes descritas: 1.
- Referencia que se puede abrir: [form.html](form.html).
- Textos: sustituidos por texto de relleno de la misma longitud.

Las variantes van de la más usada a la menos usada. Implementa primero la primera.

## Variante `form-1`

- Usos: 1, en 1 página.
- Etiqueta: `<form>`.
- Tamaño medido: 448 × 66 px (ventana de 1440 px).
- Elementos internos: 5.

### Estilos del contenedor

| Propiedad | Valor medido | Token |
|---|---|---|
| `box-sizing` | `border-box` | — |
| `color` | `rgb(0, 0, 0)` | `--color-text-primary` |
| `cursor` | `auto` | — |
| `display` | `block` | — |
| `font-family` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif` | `--font-family-body` |
| `font-size` | `16px` | `--font-size-400` |
| `font-style` | `normal` | — |
| `font-weight` | `400` | `--font-weight-400` |
| `height` | `66px` | — |
| `letter-spacing` | `normal` | — |
| `line-height` | `24px` | `--font-line-height-7` |
| `text-align` | `center` | — |
| `text-transform` | `none` | — |
| `white-space` | `normal` | — |
| `width` | `448px` | — |

### Tokens que usan sus elementos internos

`--color-palette-13`, `--color-palette-16`, `--color-palette-2`, `--color-palette-6`, `--color-surface`, `--font-letter-spacing-3`, `--font-line-height-5`, `--font-line-height-6`, `--font-size-200`, `--font-size-300`, `--font-weight-500`, `--font-weight-600`, `--radius-2`, `--radius-4`, `--space-5`, `--space-7`

### Estados

Ninguna regla de estado de las hojas de estilo leídas afecta a este elemento.

### Estados de sus elementos internos

| Elemento | Estado | Propiedad | Valor | Token |
|---|---|---|---|---|
| `<input>` nº 1 | deshabilitado | `color` | `rgb(193, 193, 193)` | `--color-palette-11` |
| `<input>` nº 1 | deshabilitado | `cursor` | `not-allowed` | — |
| `<input>` nº 1 | con foco | `border-bottom-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<input>` nº 1 | con foco | `border-left-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<input>` nº 1 | con foco | `border-right-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<input>` nº 1 | con foco | `border-top-color` | `rgb(3, 75, 255)` | `--color-palette-7` |
| `<input>` nº 1 | con foco | `box-shadow` | `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` | — |
| `<button>` nº 2 | pulsado | `background-color` | `rgb(5, 45, 225)` | `--color-palette-5` |
| `<button>` nº 2 | ratón encima | `background-color` | `rgb(5, 45, 225)` | `--color-palette-5` |
| `<button>` nº 2 | ratón encima | `color` | `rgb(255, 255, 255)` | `--color-surface` |

### Transición

Sin transición declarada.

### Estructura

```html
<form>
  <div>
    <label>
      Lorem ipsum do
    </label>
    <div>
      <input type="text">
      <button type="submit">
        Lorem ip
      </button>
    </div>
  </div>
</form>
```
