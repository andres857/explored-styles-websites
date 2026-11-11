# Prompt del subagente: sidebar de SaaS con el comportamiento de la aplicación analizada

## Objetivo

Construir una vista de ejemplo cuyo protagonista es un **sidebar típico de aplicación SaaS**
(cambio de espacio de trabajo, navegación principal, secciones, utilidades y menú de
usuario), con el aspecto **y el comportamiento** del sidebar de la aplicación analizada, hasta
donde lo permita la información ya extraída.

Es "solo para verlo": el contenido a la derecha es de relleno. Lo que importa es el sidebar.

Hay una segunda meta igual de importante: **averiguar cuánto del comportamiento se puede
reconstruir con lo que el extractor ya obtuvo**, y dejarlo documentado con honestidad.

## Lo que se sabe (ya comprobado en el run)

Run: `/home/andres/Documents/projects/explorador-web-estilos/runs/20261111-013633-2f4ac1/`

**Medido** (variables CSS del sitio en `report.json` → `cssVariables`):
- `--main-side-nav-width: 60px`: ancho del carril de iconos.
- `--sidebar-content-width: 272px`: ancho de un panel secundario.
- `--sidebar-width: 0px` y `--left-nav-width: 0px`: en las 5 pantallas capturadas ese panel
  estaba cerrado.
- `--right-sidebar-width: 269px`, `--workspace-agent-panel-width: 400px`.
- `--air-background-hover-subtle: #efefef`, `--air-focus-ring: #0563e9`,
  `--air-border-hover-input: #c1c1c1`.
- En los selectores de `report.json` aparecen clases como `transition-opacity duration-150`:
  indicio de transiciones de 150 ms.

**Visto en las capturas** (`screenshots/*.png`): carril vertical estrecho de iconos sin texto;
grupos separados por una línea fina; el elemento activo lleva un fondo gris con esquinas
redondeadas; abajo, un grupo de utilidades y un avatar circular con iniciales; arriba, fuera
del carril, el nombre del espacio de trabajo junto a un distintivo.

**Desconocido** (el extractor no captura interacción): qué abre el panel secundario (clic,
hover, fijado), si los iconos muestran una etiqueta al pasar el ratón, curvas de animación,
orden de foco y atajos, comportamiento en móvil.

Verifica estos datos tú mismo leyendo los archivos antes de apoyarte en ellos, y busca si hay
más pistas que no estén en esta lista (otras variables, otras clases en los selectores).

## Salidas

Todo dentro de `/home/andres/Documents/projects/explorador-web-estilos/preview/sidebar-air/`:

1. `build-tokens.mjs` y `tokens.css` (puedes partir del generador de
   `preview/galeria-air/build-tokens.mjs`).
2. `index.html`: la vista.
3. `COMO-SE-HIZO.md`: el documento más importante. Para cada rasgo del sidebar (anchos,
   colores, estados, cada comportamiento) indica su procedencia con una de tres etiquetas:
   - **Medido**: sale de un token o de una variable CSS del run. Cita cuál.
   - **Deducido**: se infiere de una captura o de una pista. Di de cuál y con qué seguridad.
   - **Inventado**: no hay ninguna evidencia; es la convención habitual de un SaaS.
   Y termina con la lista de **qué habría que capturar** para reproducir el comportamiento
   real, en forma de capacidades concretas que le faltan al extractor.
4. `verificacion-1440.png` y `verificacion-390.png`.

## Qué debe tener el sidebar

- **Carril de iconos** de 60 px con: distintivo y cambio de espacio de trabajo arriba,
  navegación principal por grupos con separadores, utilidades abajo y avatar con menú de
  usuario.
- **Panel secundario** de 272 px que se abre junto al carril, con el contenido de la sección
  elegida (subnavegación, listas, un buscador).
- **Comportamiento**, lo mejor que se pueda reconstruir:
  - abrir, cerrar y fijar el panel secundario, con transición;
  - elemento activo, hover y foco;
  - etiqueta al pasar el ratón o enfocar un icono (un carril sin texto la necesita);
  - menús desplegables del espacio de trabajo y del usuario;
  - teclado completo: Tab, flechas dentro del carril, Escape para cerrar, y un atajo para
    plegar;
  - en móvil, el sidebar entero como capa deslizante.
- **Panel "Procedencia"** visible en la propia vista: un control que, al activarlo, marca
  sobre el sidebar qué partes son medidas, deducidas o inventadas (por ejemplo con un contorno
  y una leyenda). Es para que quien mire la vista distinga de un vistazo lo real de lo supuesto.
- Respeta `prefers-reduced-motion`.
- Contenido de relleno a la derecha: una cabecera y unas tarjetas neutras. No lo trabajes.

## Reglas sobre los tokens

- Todos los colores, tamaños de fuente, radios, sombras y familias salen de `tokens.css`
  mediante `var(--…)`. Lee `preview/galeria-air/TOKENS-USADOS.md`: ya resuelve qué token sirve
  para cada papel; reutiliza esas decisiones.
- **Excepción permitida y obligatoriamente documentada**: los valores que vienen de variables
  CSS del sitio y no existen como token (60 px, 272 px, 150 ms, y `#0563e9` o `#efefef` si no
  coinciden con ningún token). Decláralos en un bloque `:root` aparte, con un comentario que
  cite la variable de origen, y lístalos en `COMO-SE-HIZO.md` como huecos del extractor.
  Comprueba primero si el valor ya existe como token; si existe, usa el token.
- Fuera de eso, solo maquetación (`0`, `100%`, `z-index`, cortes de `@media`).

## Límites

- No modifiques nada fuera de `preview/sidebar-air/`. No toques las otras carpetas de
  `preview/`, ni `src/`, `tests/`, `runs/` ni los documentos del proyecto.
- **Privacidad**: el run y sus capturas contienen el nombre de una persona, sus iniciales, el
  nombre de su espacio de trabajo y el de un tablero. No copies ninguno de esos textos a
  ningún archivo ni a tu informe. Usa nombres genéricos. No leas la carpeta `.auth/`.
- **No abras el sitio analizado** ni ningún otro sitio en la red, aunque exista una sesión
  guardada: el encargo es reconstruir con lo ya obtenido. Si crees que haría falta observar la
  aplicación en vivo, dilo en el informe; no lo hagas.
- **No copies el logotipo, el nombre ni los iconos del sitio.** Dibuja tus propios iconos en
  SVG, genéricos, y nombres de sección genéricos de SaaS (Inicio, Proyectos, Informes…). La
  vista debe decir que es un ejemplo generado con tokens extraídos.
- Sin dependencias nuevas, sin CDN, sin peticiones de red. Sin llamadas a APIs de IA. Sin
  commits ni cambios de rama. Sin `localStorage`.
- No mates ni reinicies procesos que ya estén corriendo (servidor en el puerto 4310; posible
  Google Chrome del usuario con depuración en el 9333, al que no debes conectarte).

## Verificación antes de terminar

Con Playwright, ejecutando tus scripts desde
`/home/andres/Documents/projects/explorador-web-estilos/.claude/worktrees/fase-1-normalize`:

1. `index.html` abre con `file://` sin errores de consola ni peticiones http(s).
2. Anchos reales: carril 60 px y panel 272 px, medidos en el navegador.
3. Cada comportamiento probado de verdad: abrir, cerrar y fijar el panel; hover y foco;
   etiquetas; los dos menús; teclado (Tab, flechas, Escape, atajo); capa en móvil.
4. Sin colores, tamaños de fuente, radios, sombras ni familias escritos a mano fuera del bloque
   de excepciones documentado.
5. Sin desplazamiento horizontal a 1440 px ni a 390 px, con el panel abierto y cerrado.
6. El control "Procedencia" marca todas las partes del sidebar y la leyenda coincide con
   `COMO-SE-HIZO.md`.
7. Capturas en `verificacion-1440.png` (con el panel abierto) y `verificacion-390.png`.

Borra los scripts de comprobación al terminar.

## Informe final

Archivos creados; resultado de cada comprobación con cifras; y, sobre todo, **cómo lo
hiciste**: qué parte del sidebar es medida, cuál deducida y cuál inventada, en proporción
aproximada; qué pistas nuevas encontraste en el run; y qué tendría que capturar el extractor
para que el comportamiento no hubiera que suponerlo.
