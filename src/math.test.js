import { combinations, combine, best, finest } from './math';
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
          previousInvestments: ['Orc Pools Upgrade'],
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
        { giviniStart: 50 }
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
        { giviniStart: 15 }
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
          giviniStart: 36,
          giviniExtra: 1,
          previousInvestments: ['Givini Orc Merchant'],
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
          previousInvestments: [
            "Tradesmasher's Guild",
            'Orc Pools Upgrade',
            'Orcish Democracy',
          ],
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

  test('it does not buy the statues if they are useless', () => {
    expect(
      best({
        investments: invs(
          'Givini Orc Merchant',
          'Bank of Givini',
          'Givini Banners + Givini Dragon Statue'
        ),
        money: 500000,
        context: {
          giviniStart: 18,
          giviniExtra: 6,
        },
      })
    ).toEqual({
      price: 450000,
      profits: 400000,
      social: 0,
      givini: 10,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 100000,
          country: 'New Givini',
          givini: 5,
        },
        inv('Bank of Givini'),
      ],
    });
  });
});

describe('finest', () => {
  describe('my personal use case', () => {
    test('first round', () => {
      const previousInvestments = [
        'Premium Steel Owner',

        'Denmiel Mushrooms',
        'Eustrin Guild',
        "Min's Trade Route",
        'Yhilini Succubi Trade',

        // Reduce possible combinations by forcing some investments
        'Givini Orc Merchant',
        'Bank of Givini',
      ];

      const result = finest({
        previousInvestments,
        // Remaining + Profits - Already invested
        money: 7500 + 2435000 - 450000,
        social: 6,
        giviniStart: 18 + 10,
        giviniExtra: 6,
        chapter1Bank: true,
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
      const previousInvestments = [
        'Premium Steel Owner',

        'Denmiel Mushrooms',
        'Eustrin Guild',
        "Min's Trade Route",
        'Yhilini Succubi Trade',

        'Givini Orc Merchant',
        'Bank of Givini',

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

        'Hall of Mental Strength',
        'Orc Pools Upgrade',
      ];

      const result = finest({
        previousInvestments,
        // Remaining + Profits - Cost of (unlisted) magic/military upgrades - Cost of bribing orc vote
        money: 42500 + 3262000 - 460000 - 700000,
        giviniStart: 35,
        giviniExtra: 1,
        chapter1Bank: true,
      });

      expect(
        result.investments
          .map(({ name }) => name)
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(
        [
          "Cee'Kan Shipping",
          'Givini Teahouse Chain',
          'Succubus Armorer',
          'Yhilini Bank Core Lender',
          "Tradesmasher's Guild",
          'Theltiar Flowhouse',
        ].sort((a, b) => a.localeCompare(b))
      );
    });
  });
});
