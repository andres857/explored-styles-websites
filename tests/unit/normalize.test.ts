import { describe, it } from 'vitest';

describe('NORMALIZE', () => {
  it.todo('CAT-16 #fff, #ffffff, rgb(255,255,255) y hsl(0 0% 100%) → un solo token.');
  it.todo('CAT-17 transparent y alfa 0 no generan token.');
  it.todo('CAT-18 rgba con alfa 0.5 → hex de 8 dígitos, distinto del color opaco.');
  it.todo('CAT-19 Colores con deltaE < 2 no se fusionan y aparecen en nearDuplicates.');
  it.todo('CAT-20 Valores 0 y auto no generan token de espaciado.');
  it.todo('CAT-21 Detecta baseUnit 8, baseUnit 4, y ausencia de baseUnit.');
  it.todo('CAT-22 9999px y 50 % → radius full.');
  it.todo('CAT-23 box-shadow none se ignora; sombra de varias capas = un token.');
  it.todo('CAT-24 lineHeight normal se conserva como "normal".');
  it.todo('CAT-25 Entrada vacía → TokenCandidates vacío y válido.');
  it.todo('CAT-26 Mismo input en distinto orden → mismo output.');
  it.todo('CAT-37 Tamaños en px con un decimal como máximo: 16.666px → 16.7px; 16px y 16.0px son el mismo token.');
  it.todo('CAT-38 fontFamily: comillas y espacios unificados; valor = pila completa, nombre corto = primera familia.');
  it.todo('CAT-39 letterSpacing normal se conserva como "normal".');
  it.todo('CAT-40 Radio 0 no genera token; 4 esquinas iguales cuentan como una ocurrencia.');
  it.todo('CAT-41 fontWeight normal y bold → 400 y 700.');
});
