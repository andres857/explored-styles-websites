## Reglas para el agente
1. Al iniciar cada sesión, lee CLAUDE.md, SPEC.md y PROGRESO.md antes de hacer nada.
2. Una fase por sesión. Al terminar, actualiza PROGRESO.md y detente.
3. No modifiques SPEC.md, TEST_CATALOG.md, los fixtures ni los esquemas sin mi aprobación.
   Si algo te parece incorrecto, propón el cambio y espera.
4. No agregues tests fuera del catálogo. Si descubres un caso nuevo, anótalo en
   PROGRESO.md, en la sección "Casos propuestos", y sigue.
5. Si un test falla, se corrige el código, no el test.
6. No agregues dependencias fuera del stack sin aprobación.
7. Una fase está terminada cuando sus tests CAT pasan y typecheck y lint están limpios.
8. Si fallas 3 veces seguidas con el mismo test, detente y explica qué está pasando.
9. Prohibido llamar a APIs de IA en v1.
