import { combinations } from './math';

describe('combinations', () => {
  test('empty', () => {
    expect(combinations([])).toEqual([[]]);
  });

  test('one element', () => {
    expect(
      combinations([
        {
          name: 'Imp Offices',
        },
      ])
    ).toEqual([
      [],
      [
        {
          name: 'Imp Offices',
        },
      ],
    ]);
  });

  test('two elements', () => {
    expect(
      combinations([
        {
          name: 'Imp Offices',
        },
        {
          name: 'War Monument',
        },
      ])
    ).toEqual([
      [],
      [
        {
          name: 'Imp Offices',
        },
      ],
      [
        {
          name: 'War Monument',
        },
      ],
      [
        {
          name: 'Imp Offices',
        },
        {
          name: 'War Monument',
        },
      ],
    ]);
  });

  test('three elements', () => {
    expect(
      combinations([
        {
          name: 'Imp Offices',
        },
        {
          name: 'Denmiel Archives',
        },
        {
          name: 'War Monument',
        },
      ])
    ).toEqual([
      [],
      [
        {
          name: 'Denmiel Archives',
        },
      ],
      [
        {
          name: 'Imp Offices',
        },
      ],
      [
        {
          name: 'War Monument',
        },
      ],
      [
        {
          name: 'Denmiel Archives',
        },
        {
          name: 'Imp Offices',
        },
      ],
      [
        {
          name: 'Denmiel Archives',
        },
        {
          name: 'War Monument',
        },
      ],
      [
        {
          name: 'Imp Offices',
        },
        {
          name: 'War Monument',
        },
      ],
      [
        {
          name: 'Denmiel Archives',
        },
        {
          name: 'Imp Offices',
        },
        {
          name: 'War Monument',
        },
      ],
    ]);
  });
});
