# Prompt del subagente: visor de PDF de ejemplo con los tokens de Air

## Objetivo

Repetir con https://app.air.inc/ lo que ya se hizo con catscribetranslate.com: construir una
vista **nueva**, un visor de PDF, que parezca hecha por el equipo de Air, usando solo los
tokens que el Explorador extrajo de su aplicación.

Sigue todas las instrucciones de
`/home/andres/Documents/projects/explorador-web-estilos/prompts/vista-ejemplo-visor-pdf.md`
(qué debe tener el visor, reglas sobre los tokens, límites, verificación e informe final),
con estas diferencias:

## Diferencias respecto al prompt base

- **Run de entrada**: `/home/andres/Documents/projects/explorador-web-estilos/runs/20261111-013633-2f4ac1/`
  Son 5 pantallas internas de la aplicación (un tablero, Canvases, Context, Skills y
  Automations), recorridas con una sesión iniciada. Mira sus capturas: Air es una aplicación
  de trabajo, densa y sobria, con barra lateral de iconos y un panel de tareas a la derecha.
- **Carpeta de salida**: `/home/andres/Documents/projects/explorador-web-estilos/preview/visor-pdf-air/`
  Es la única carpeta donde puedes crear o modificar archivos.
- **No toques** `preview/visor-pdf/`, `preview/air/`, `preview/index.html` ni `preview/build.mjs`.
  Puedes **leer** `preview/visor-pdf/` como referencia de lo que funcionó (generador de
  `tokens.css`, forma de mover la página y el zoom del visor nativo), pero escribe tus propios
  archivos y no copies su aspecto: el resultado debe parecerse a Air, no al visor anterior.
- **Dato distinto del run anterior**: aquí `color.primary` sí es un color de marca (`#00276d`,
  el azul marino de los botones principales). Compruébalo en `report.json` antes de usarlo.
- **Contenido privado**: las capturas y los selectores del run contienen datos de la cuenta de
  la persona (nombre, nombre del espacio de trabajo, nombre de un tablero). **No copies esos
  textos** a la vista, al PDF de ejemplo ni a `TOKENS-USADOS.md`. Usa textos genéricos.
- **No uses el logotipo ni el nombre de Air como si la vista fuera suya.** La cabecera debe
  decir que es una vista de ejemplo generada con tokens extraídos. Nada de marcas ni iconos
  copiados del sitio.
- **No abras ni recorras app.air.inc**, y no leas nada de la carpeta `.auth/`. Todo lo que
  necesitas está en el run.

## Qué quiero saber al final, además de lo que pide el prompt base

Una comparación corta: qué fue más fácil y qué más difícil que con el run de
catscribetranslate.com a la hora de construir una vista real, y qué dice eso del extractor
(por ejemplo: escalas más limpias o más ruidosas, roles mejor o peor asignados, sombras
utilizables o no).
