import { combinations } from './math';

describe('combinations', () => {
  test('empty', () => {
    expect(combinations([])).toEqual([[]]);
  });

  test('one element', () => {
    expect(combinations(['a'])).toEqual([['a'], []]);
  });

  test('two elements', () => {
    expect(combinations(['a', 'b'])).toEqual([['a', 'b'], ['a'], ['b'], []]);
  });

  test('three elements', () => {
    expect(combinations(['a', 'b', 'c'])).toEqual([
      ['a', 'b', 'c'],
      ['a', 'b'],
      ['a', 'c'],
      ['a'],
      ['b', 'c'],
      ['b'],
      ['c'],
      [],
    ]);
  });
});
