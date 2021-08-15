import { combinations, combine } from './math';
import investments from './investments';

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

describe('combine', () => {
  test('one element', () => {
    expect(
      combine([
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
        },
      ])
    ).toEqual({
      price: 200000,
      profits: 25000,
      social: 1,
      givini: 0,
      investments: [
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
        },
      ],
    });
  });
  test('two elements', () => {
    expect(
      combine([
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
        },
        {
          name: 'Booze Shack',
          price: 150000,
          profits: 50000,
          country: "Tak'Kan",
          social: 1,
        },
      ])
    ).toEqual({
      price: 350000,
      profits: 75000,
      social: 2,
      givini: 0,
      investments: [
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
        },
        {
          name: 'Booze Shack',
          price: 150000,
          profits: 50000,
          country: "Tak'Kan",
          social: 1,
        },
      ],
    });
  });
  test('tradesmasher', () => {
    expect(
      combine(
        [
          investments.find(({ name }) => name === "Tradesmasher's Guild"),
          investments.find(({ name }) => name === 'Orcish Democracy'),
        ],
        {
          previousInvestments: [
            {
              name: 'Orc Pools Upgrade',
            },
          ],
        }
      )
    ).toEqual({
      price: 1350000,
      profits: 125000,
      social: 5,
      givini: 0,
      investments: [
        {
          name: "Tradesmasher's Guild",
          price: 350000,
          profits: 125000,
          country: "Tak'Kan",
        },
        {
          name: 'Orcish Democracy',
          price: 1000000,
          country: "Tak'Kan",
          social: 5,
          profits: 0,
        },
      ],
    });
  });
  test('givini orc merchant', () => {
    expect(
      combine([investments.find(({ name }) => name === 'Givini Orc Merchant')])
    ).toEqual({
      price: 100000,
      profits: 25000,
      givini: 5,
      social: 0,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 25000,
          country: 'New Givini',
          givini: 5,
        },
      ],
    });
    expect(
      combine(
        [investments.find(({ name }) => name === 'Givini Orc Merchant')],
        { baseStats: { givini: 50 } }
      )
    ).toEqual({
      price: 500000,
      profits: 200000,
      givini: 5,
      social: 0,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 500000,
          profits: 200000,
          country: 'New Givini',
          givini: 5,
        },
      ],
    });
    expect(
      combine(
        [
          investments.find(({ name }) => name === 'Givini Orc Merchant'),
          investments.find(({ name }) => name === 'Bank of Givini'),
          investments.find(({ name }) => name === 'War Monument'),
        ],
        { baseStats: { givini: 15 } }
      )
    ).toEqual({
      price: 1450000,
      profits: 400000,
      givini: 20,
      social: 3,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 100000,
          country: 'New Givini',
          givini: 5,
        },
        {
          name: 'Bank of Givini',
          price: 350000,
          profits: 300000,
          country: 'New Givini',
          givini: 5,
        },
        {
          name: 'War Monument',
          price: 1000000,
          country: 'New Givini',
          givini: 10,
          social: 3,
          profits: 0,
        },
      ],
    });
  });
});
