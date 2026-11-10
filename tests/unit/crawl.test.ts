import { describe, it } from 'vitest';

describe('CRAWL', () => {
  it.todo('CAT-01 Recorre páginas enlazadas del mismo origen.');
  it.todo('CAT-02 Ignora enlaces a otros dominios.');
  it.todo('CAT-03 Se detiene en maxPages.');
  it.todo('CAT-04 Respeta maxDepth.');
  it.todo('CAT-05 Trata /page, /page/ y /page#x como la misma URL.');
  it.todo('CAT-06 Un 404 queda registrado y el recorrido continúa.');
  it.todo('CAT-07 Un timeout queda registrado y el recorrido continúa.');
  it.todo('CAT-08 Respeta Disallow de robots.txt.');
  it.todo('CAT-09 Un redirect a otro origen no se recorre.');
  it.todo('CAT-10 Genera una captura por página exitosa.');
  it.todo('CAT-53 Trata /page?a=1 y /page como la misma URL.');
});
