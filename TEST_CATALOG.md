## Catálogo de tests
CRAWL
- CAT-01 Recorre páginas enlazadas del mismo origen.
- CAT-02 Ignora enlaces a otros dominios.
- CAT-03 Se detiene en maxPages.
- CAT-04 Respeta maxDepth.
- CAT-05 Trata /page, /page/ y /page#x como la misma URL.
- CAT-06 Un 404 queda registrado y el recorrido continúa.
- CAT-07 Un timeout queda registrado y el recorrido continúa.
- CAT-08 Respeta Disallow de robots.txt.
- CAT-09 Un redirect a otro origen no se recorre.
- CAT-10 Genera una captura por página exitosa.
- CAT-53 Trata /page?a=1 y /page como la misma URL.

EXTRACT
- CAT-11 Excluye elementos ocultos (display:none, visibility:hidden, tamaño 0).
- CAT-12 Extrae variables CSS definidas en :root.
- CAT-13 Página sin CSS propio: extrae los valores del navegador sin fallar.
- CAT-14 Lee estilos dentro de shadow DOM abierto.
- CAT-15 Contenido inyectado por JavaScript después de la carga sí se extrae.
- CAT-52 El color de borde solo se extrae en los lados con ancho mayor que 0.

NORMALIZE
- CAT-16 #fff, #ffffff, rgb(255,255,255) y hsl(0 0% 100%) → un solo token.
- CAT-17 transparent y alfa 0 no generan token.
- CAT-18 rgba con alfa 0.5 → hex de 8 dígitos, distinto del color opaco.
- CAT-19 Colores con deltaE < 2 no se fusionan y aparecen en nearDuplicates.
- CAT-20 Valores 0 y auto no generan token de espaciado.
- CAT-21 Detecta baseUnit 8, baseUnit 4, y ausencia de baseUnit.
- CAT-22 9999px y 50 % → radius full.
- CAT-23 box-shadow none se ignora; sombra de varias capas = un token.
- CAT-24 lineHeight normal se conserva como "normal".
- CAT-25 Entrada vacía → TokenCandidates vacío y válido.
- CAT-26 Mismo input en distinto orden → mismo output.
- CAT-37 Tamaños en px con un decimal como máximo: 16.666px → 16.7px; 16px y 16.0px son el mismo token.
- CAT-38 fontFamily: comillas y espacios unificados; valor = pila completa, nombre corto = primera familia.
- CAT-39 letterSpacing normal se conserva como "normal".
- CAT-40 Radio 0 no genera token; 4 esquinas iguales cuentan como una ocurrencia.
- CAT-41 fontWeight normal y bold → 400 y 700.

NAME
- CAT-27 color.surface sale del fondo del body.
- CAT-28 color.primary sale del fondo más frecuente de los botones.
- CAT-29 Si heading y body usan la misma familia, no se crea heading.
- CAT-30 Empates de frecuencia se resuelven igual en cada ejecución.
- CAT-42 color.text.primary y color.text.secondary salen de los dos colores de texto más frecuentes.
- CAT-43 Un valor recibe un solo nombre (surface → primary → text.primary → text.secondary → palette); un rol sin candidato no se crea.
- CAT-44 color.palette.N se ordena por luminancia ascendente.
- CAT-45 font.size se nombra 100, 200, 300… de menor a mayor.
- CAT-46 space: múltiplos de baseUnit → space.<n>; no múltiplos → space.px-<valor>; sin baseUnit → space.1..N.
- CAT-47 radius: 1 valor → md; 2 → sm y lg; 3 → sm, md y lg; 4 o más → radius.1..N; full siempre aparte.
- CAT-48 shadow.N se ordena por el blur máximo entre sus capas.
- CAT-49 font.weight.<valor>, font.lineHeight.N y font.letterSpacing.N, con N por orden ascendente.

EXPORT
- CAT-31 tokens.json valida contra el esquema DTCG definido.
- CAT-32 report.json incluye conteo, páginas y máximo 5 selectores por token.
- CAT-50 Un valor "normal" no aparece en tokens.json y sí en report.json.
- CAT-51 report.json lista cssVariables y asocia a cada token sus matchingVariables.

PIPELINE
- CAT-54 Recorrido de punta a punta sobre site-basic: run.json, pages.json, tokens.json, report.json y capturas, válidos contra sus esquemas.
- CAT-55 Dos corridas del mismo sitio producen un tokens.json idéntico byte a byte.
- CAT-56 CLI: termina con código 0 e imprime el runId; con URL inválida termina con código distinto de 0.

API
- CAT-33 POST con URL inválida → 400.
- CAT-34 POST válido → 202 y el run termina en estado done.
- CAT-35 GET de un run inexistente → 404.
- CAT-36 Dos POST seguidos: el segundo espera en cola.
- CAT-57 GET tokens y GET report de un run done → 200 con el contenido del archivo.
- CAT-58 GET screenshots/:file sirve la imagen; un nombre que no sea <slug>.png → 400.
- CAT-59 GET tokens de un run sin terminar → 409.
