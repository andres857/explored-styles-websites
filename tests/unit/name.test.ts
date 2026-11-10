import { describe, it } from 'vitest';

describe('NAME', () => {
  it.todo('CAT-27 color.surface sale del fondo del body.');
  it.todo('CAT-28 color.primary sale del fondo más frecuente de los botones.');
  it.todo('CAT-29 Si heading y body usan la misma familia, no se crea heading.');
  it.todo('CAT-30 Empates de frecuencia se resuelven igual en cada ejecución.');
  it.todo('CAT-42 color.text.primary y color.text.secondary salen de los dos colores de texto más frecuentes.');
  it.todo('CAT-43 Un valor recibe un solo nombre (surface → primary → text.primary → text.secondary → palette); un rol sin candidato no se crea.');
  it.todo('CAT-44 color.palette.N se ordena por luminancia ascendente.');
  it.todo('CAT-45 font.size se nombra 100, 200, 300… de menor a mayor.');
  it.todo('CAT-46 space: múltiplos de baseUnit → space.<n>; no múltiplos → space.px-<valor>; sin baseUnit → space.1..N.');
  it.todo('CAT-47 radius: 1 valor → md; 2 → sm y lg; 3 → sm, md y lg; 4 o más → radius.1..N; full siempre aparte.');
  it.todo('CAT-48 shadow.N se ordena por el blur máximo entre sus capas.');
  it.todo('CAT-49 font.weight.<valor>, font.lineHeight.N y font.letterSpacing.N, con N por orden ascendente.');
});
