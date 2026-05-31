import { calculateBreakTime } from '../controllers/studyController';

describe('Testy Algorytmu Inteligentnych Przerw', () => {
  test('Powinien poprawnie obliczyć standardową przerwę dla poziomu MEDIUM', () => {
    expect(calculateBreakTime(50, 'MEDIUM')).toBe(10);
  });

  test('Powinien wydłużyć przerwę o 5 minut dla poziomu HIGH', () => {
    expect(calculateBreakTime(50, 'HIGH')).toBe(15);
  });

  test('Powinien skrócić przerwę dla poziomu LOW', () => {
    expect(calculateBreakTime(50, 'LOW')).toBe(8);
  });
});