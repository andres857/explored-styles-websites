# Progreso

| Fase | Contenido | Tests | Estado |
|------|-----------|-------|--------|
| 0 | Preparación: documentos, configuración, tests `it.todo`, fixtures | — | ✅ Completada (2026-11-10) |
| 1 | `schemas.ts` + normalize | CAT-16 a 26 y 37 a 41 | ⬜ Pendiente |
| 2 | name + export | CAT-27 a 32 y 42 a 51 | ⬜ Pendiente |
| 3 | extract con fixtures | CAT-11 a 15 y 52 | ⬜ Pendiente |
| 4 | crawl | CAT-01 a 10 y 53 | ⬜ Pendiente |
| 5 | pipeline + CLI | CAT-54 a 56 | ⬜ Pendiente |
| 6 | server | CAT-33 a 36 y 57 a 59 | ⬜ Pendiente |
| 7 | Mutation testing sobre normalize y name; meta ≥ 80 % | — | ⬜ Pendiente |

## Decisiones aprobadas (2026-11-10)

Revisión de la spec antes de empezar la fase 1. Todas están ya escritas en `SPEC.md`.

- **D1** Salida en DTCG 2025.10: color y dimension como objetos; esquema `DtcgTokensSchema` en zod.
  Los valores "normal" van solo a `report.json`.
- **D2** Nombrado: un valor recibe un solo nombre (surface → primary → text.primary →
  text.secondary → palette); reglas para radius, space, font.weight, lineHeight y letterSpacing.
- **D3** Normalización: radio 0 ignorado, 4 esquinas iguales = 1 ocurrencia, fontWeight numérico,
  fontFamily con comillas y espacios unificados.
- **D4** Se extraen los colores de borde (solo lados con ancho > 0).
- **D5** Las variables CSS no generan tokens; van a `report.json` (`cssVariables`, `matchingVariables`).
- **D6** El query se quita al normalizar URLs.
- **D7** Esquemas para `run.json`, `pages.json` y `report.json`; 409 para runs sin terminar;
  screenshots solo `<slug>.png`; servidor en 127.0.0.1.
- **D8** El catálogo pasa de 36 a 59 casos (CAT-37 a 59). Los CAT-01 a 36 no cambian.

## Casos propuestos

_(ninguno todavía)_

## Dependencias aprobadas fuera del stack

- Fase 0: `eslint`, `@eslint/js`, `typescript-eslint`, `tsx`, `@stryker-mutator/core`,
  `@stryker-mutator/vitest-runner`, `@types/node`, `@types/express`.

## Pendientes de entorno

- Antes de la fase 3: `npx playwright install chromium` (Playwright 1.65 pide la revisión 1254
  y no está instalada).

## Dudas abiertas sobre la especificación

_(ninguna)_
