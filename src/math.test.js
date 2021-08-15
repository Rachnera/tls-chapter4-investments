import { combinations, combine, best } from './math';
import investments from './investments';

const inv = (a) => investments.find(({ name }) => name === a);
const invs = (...list) => list.map(inv);

describe('combinations', () => {
  test('empty', () => {
    expect(combinations([])).toEqual([[]]);
  });

  test('one element', () => {
    expect(combinations(invs('Imp Offices'))).toEqual([
      [],
      invs('Imp Offices'),
    ]);
  });

  test('two elements', () => {
    expect(combinations(invs('Imp Offices', 'War Monument'))).toEqual([
      [],
      invs('War Monument'),
      invs('Imp Offices'),
      invs('War Monument', 'Imp Offices'),
    ]);
  });

  test('three elements', () => {
    expect(
      combinations(invs('Imp Offices', 'Denmiel Archives', 'War Monument'))
    ).toEqual([
      [],
      invs('War Monument'),
      invs('Denmiel Archives'),
      invs('Imp Offices'),
      invs('War Monument', 'Denmiel Archives'),
      invs('War Monument', 'Imp Offices'),
      invs('Denmiel Archives', 'Imp Offices'),
      invs('War Monument', 'Denmiel Archives', 'Imp Offices'),
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

describe('best', () => {
  test('best is buying nothing', () => {
    expect(
      best({
        investments: invs('Imp Offices'),
        money: 1000000,
      })
    ).toEqual({ price: 0, profits: 0, social: 0, givini: 0, investments: [] });
  });

  test('best is buying cheapest thing', () => {
    expect(
      best({
        investments: invs('Succubus Armorer', 'Givini Smithing'),
        money: 250000,
      })
    ).toEqual({
      price: 100000,
      profits: 10000,
      social: 0,
      givini: 0,
      investments: invs('Succubus Armorer'),
    });
  });

  test('best is buying thing that makes the most money', () => {
    expect(
      best({
        investments: invs('Bank of Givini', 'Givini Smithing'),
        money: 400000,
      })
    ).toEqual({
      price: 350000,
      profits: 300000,
      social: 0,
      givini: 5,
      investments: invs('Bank of Givini'),
    });
  });

  test('best is buying everything', () => {
    expect(
      best({
        investments: invs('Givini Smithing', 'Bank of Givini'),
        money: 600000,
      })
    ).toEqual({
      price: 550000,
      profits: 310000,
      social: 0,
      givini: 7,
      investments: invs('Bank of Givini', 'Givini Smithing'),
    });
  });

  test('best is buying best social thingie', () => {
    expect(
      best({
        investments: invs('Booze Shack', 'Bank of Givini', 'Imp Offices'),
        money: 400000,
        social: 1,
      })
    ).toEqual({
      price: 150000,
      profits: 50000,
      social: 1,
      givini: 0,
      investments: invs('Booze Shack'),
    });
  });

  test('best is improving Givini score', () => {
    expect(
      best({
        investments: invs(
          'Givini Banners + Givini Dragon Statue',
          'Booze Shack',
          'Givini Smithing'
        ),
        money: 300000,
        context: {
          baseStats: { givini: 36 },
          additionalStats: { givini: 1 },
          previousInvestments: invs('Givini Orc Merchant'),
        },
      })
    ).toEqual({
      price: 203500,
      profits: 60000,
      social: 0,
      givini: 3,
      investments: [
        {
          name: 'Givini Smithing',
          price: 200000,
          profits: 10000,
          country: 'New Givini',
          givini: 2,
        },
        {
          name: 'Givini Banners + Givini Dragon Statue',
          price: 1000 + 2500,
          country: 'New Givini',
          givini: 1,
          profits: 0,
        },
      ],
    });
  });

  test('best is improving tradesmasher guild score', () => {
    expect(
      best({
        investments: invs('Lonely Sailor Services', 'Gasm Falls Trade'),
        money: 300000,
        context: {
          previousInvestments: invs(
            "Tradesmasher's Guild",
            'Orc Pools Upgrade',
            'Orcish Democracy'
          ),
        },
      })
    ).toEqual({
      price: 250000,
      profits: 125000,
      social: 1,
      givini: 0,
      investments: invs('Lonely Sailor Services'),
    });
  });

  describe('my personal use case', () => {
    test('first round', () => {
      const previous = [
        'Denmiel Mushrooms',
        'Eustrin Guild',
        "Min's Trade Route",
        'Yhilini Succubi Trade',

        // Reduce possible combinations by forcing some investments
        'Givini Orc Merchant',
        'Bank of Givini',
      ];

      const available = investments.filter(
        ({ name }) => !previous.includes(name)
      );
      const previousInvestments = investments.filter(({ name }) =>
        previous.includes(name)
      );

      const result = best({
        investments: available,
        // Remaining + Profits - Already invested
        money: 7500 + 2435000 - 450000,
        context: {
          baseStats: { givini: 18 + 10 },
          additionalStats: { givini: 6 },
          previousInvestments,
        },
        social: 6,
      });

      expect(
        result.investments
          .map(({ name }) => name)
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(
        [
          'Bank of Stineford',
          'Stineford Weapons Store',
          'Yhilini Brothel Reform',
          'Booze Shack',
          'Lonely Sailor Services',
          'Succubus Band Tour',
          'Mercenary Offices',
          'Imp Offices',
          'Trading Pillar Rights',
          'Gasm Falls Trade',
        ].sort((a, b) => a.localeCompare(b))
      );
    });

    test('second round', () => {
      const previous = [
        'Denmiel Mushrooms',
        'Eustrin Guild',
        "Min's Trade Route",
        'Yhilini Succubi Trade',

        'Bank of Stineford',
        'Stineford Weapons Store',

        'Yhilini Brothel Reform',

        'Givini Orc Merchant',
        'Bank of Givini',

        'Booze Shack',
        "Tradesmasher's Guild",
        'Lonely Sailor Services',

        'Theltiar Flowhouse',

        'Succubus Band Tour',
        'Mercenary Offices',
        'Imp Offices',

        'Hall of Mental Strength',
        'Orc Pools Upgrade',
      ];

      const available = investments.filter(
        ({ name }) => !previous.includes(name)
      );
      const previousInvestments = investments.filter(({ name }) =>
        previous.includes(name)
      );

      const result = best({
        investments: available,
        // Remaining + Profits - Cost of military upgrade (not automitcally handled yet) - Cost of bribing orc vote
        money: 17500 + 3257000 - 455500 - 700000,
        context: {
          baseStats: { givini: 35 },
          additionalStats: { givini: 1 },
          previousInvestments,
        },
      });

      expect(
        result.investments
          .map(({ name }) => name)
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(
        [
          "Cee'Kan Shipping",
          'Trading Pillar Rights',
          'Givini Teahouse Chain',
          'Succubus Armorer',
          'Yhilini Bank Core Lender',
          'Gasm Falls Trade',
        ].sort((a, b) => a.localeCompare(b))
      );
    });
  });
});
