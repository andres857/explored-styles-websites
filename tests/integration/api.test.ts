import { describe, it } from 'vitest';

describe('API', () => {
  it.todo('CAT-33 POST con URL inválida → 400.');
  it.todo('CAT-34 POST válido → 202 y el run termina en estado done.');
  it.todo('CAT-35 GET de un run inexistente → 404.');
  it.todo('CAT-36 Dos POST seguidos: el segundo espera en cola.');
  it.todo('CAT-57 GET tokens y GET report de un run done → 200 con el contenido del archivo.');
  it.todo('CAT-58 GET screenshots/:file sirve la imagen; un nombre que no sea <slug>.png → 400.');
  it.todo('CAT-59 GET tokens de un run sin terminar → 409.');
});
