import { combinations, combine, best, finest } from './math';
import investments from './data/investments';

const inv = (a) => investments.find(({ name }) => name === a);
const invs = (...list) => list.map(inv);

const giviniOrcMerchant = (context = {}) => {
  const investment = inv('Givini Orc Merchant');
  return { ...investment, price: investment.price(context) };
};

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
      combinations(invs('Imp Offices', 'Theltiar Flowhouse', 'War Monument'))
    ).toEqual([
      [],
      invs('War Monument'),
      invs('Theltiar Flowhouse'),
      invs('Imp Offices'),
      invs('War Monument', 'Theltiar Flowhouse'),
      invs('War Monument', 'Imp Offices'),
      invs('Theltiar Flowhouse', 'Imp Offices'),
      invs('War Monument', 'Theltiar Flowhouse', 'Imp Offices'),
    ]);
  });

  test('maxPrice', () => {
    expect(
      combinations(
        invs(
          'Imp Offices',
          'Theltiar Flowhouse',
          'War Monument',
          'Givini Smithing'
        ),
        { maxPrice: 400000 }
      )
    ).toEqual([
      [],
      invs('Theltiar Flowhouse'),
      invs('Givini Smithing'),
      invs('Imp Offices'),
      invs('Theltiar Flowhouse', 'Imp Offices'),
      invs('Givini Smithing', 'Imp Offices'),
    ]);
  });

  test('mandatory', () => {
    expect(
      combinations(
        invs(
          'Imp Offices',
          'Denmiel Archives',
          'War Monument',
          'Yhilini Airship Fleet',
          'Gasm Falls Water Cleanup'
        ),
        { mandatory: ['Yhilini Airship Fleet', 'Gasm Falls Water Cleanup'] }
      )
    ).toEqual([
      invs('Yhilini Airship Fleet', 'Gasm Falls Water Cleanup'),
      invs('Yhilini Airship Fleet', 'Gasm Falls Water Cleanup', 'Imp Offices'),
      invs(
        'Yhilini Airship Fleet',
        'Gasm Falls Water Cleanup',
        'Denmiel Archives'
      ),
      invs('Yhilini Airship Fleet', 'Gasm Falls Water Cleanup', 'War Monument'),
      invs(
        'Yhilini Airship Fleet',
        'Gasm Falls Water Cleanup',
        'Imp Offices',
        'Denmiel Archives'
      ),
      invs(
        'Yhilini Airship Fleet',
        'Gasm Falls Water Cleanup',
        'Imp Offices',
        'War Monument'
      ),
      invs(
        'Yhilini Airship Fleet',
        'Gasm Falls Water Cleanup',
        'Denmiel Archives',
        'War Monument'
      ),
      invs(
        'Yhilini Airship Fleet',
        'Gasm Falls Water Cleanup',
        'Imp Offices',
        'Denmiel Archives',
        'War Monument'
      ),
    ]);
  });

  test('atLeastOne', () => {
    expect(
      combinations(
        invs('Imp Offices', 'War Monument', 'Yhilini Airship Fleet'),
        { atLeastOne: ['Yhilini Airship Fleet', 'War Monument'] }
      )
    ).toEqual([
      invs('Yhilini Airship Fleet'),
      invs('War Monument'),
      invs('Yhilini Airship Fleet', 'Imp Offices'),
      invs('War Monument', 'Yhilini Airship Fleet'),
      invs('War Monument', 'Imp Offices'),
      invs('War Monument', 'Yhilini Airship Fleet', 'Imp Offices'),
    ]);
  });

  describe('mandatory + atLeastOne', () => {
    test('both are applied', () => {
      expect(
        combinations(
          invs('Imp Offices', 'War Monument', 'Yhilini Airship Fleet'),
          {
            atLeastOne: ['Yhilini Airship Fleet', 'War Monument'],
            mandatory: ['Imp Offices'],
          }
        )
      ).toEqual([
        invs('Imp Offices', 'Yhilini Airship Fleet'),
        invs('Imp Offices', 'War Monument'),
        invs('Imp Offices', 'War Monument', 'Yhilini Airship Fleet'),
      ]);
    });

    test('atLeastOne is useless', () => {
      expect(
        combinations(
          invs('Imp Offices', 'War Monument', 'Yhilini Airship Fleet'),
          {
            atLeastOne: ['Yhilini Airship Fleet', 'War Monument'],
            mandatory: ['War Monument'],
          }
        )
      ).toEqual([
        invs('War Monument'),
        invs('War Monument', 'Yhilini Airship Fleet'),
        invs('War Monument', 'Imp Offices'),
        invs('War Monument', 'Yhilini Airship Fleet', 'Imp Offices'),
      ]);
    });
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
          takkan: 3,
        },
      ])
    ).toEqual({
      price: 200000,
      profits: 25000,
      social: 1,
      givini: 0,
      takkan: 3,
      investments: [
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
          takkan: 3,
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
          takkan: 3,
        },
        {
          name: 'Booze Shack',
          price: 150000,
          profits: 50000,
          social: 1,
          takkan: 2,
        },
      ])
    ).toEqual({
      price: 350000,
      profits: 75000,
      social: 2,
      givini: 0,
      takkan: 5,
      investments: [
        {
          name: 'Hall of Mental Strength',
          price: 200000,
          profits: 25000,
          social: 1,
          takkan: 3,
        },
        {
          name: 'Booze Shack',
          price: 150000,
          profits: 50000,
          social: 1,
          takkan: 2,
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
      takkan: 15,
      investments: [
        {
          name: "Tradesmasher's Guild",
          price: 350000,
          profits: 125000,
          takkan: 5,
        },
        {
          name: 'Orcish Democracy',
          price: 1000000,
          social: 5,
          profits: 0,
          takkan: 10,
        },
      ],
    });
  });
  test('tradesmasher varying price', () => {
    expect(inv("Tradesmasher's Guild").profits({})).toBe(50000);
    expect(
      inv("Tradesmasher's Guild").profits({
        previousInvestments: ['Givini Orc Merchant', 'Orc Pools Upgrade'],
      })
    ).toBe(125000);
    expect(
      inv("Tradesmasher's Guild").profits({
        previousInvestments: ['Givini Orc Merchant', 'Orc Pools Upgrade'],
        gawnfallTakkan: 'major',
      })
    ).toBe(150000);
  });
  test('givini orc merchant', () => {
    expect(combine([giviniOrcMerchant()])).toEqual({
      price: 100000,
      profits: 25000,
      social: 0,
      givini: 5,
      takkan: 0,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 25000,
          givini: 5,
        },
      ],
    });
    expect(
      combine([giviniOrcMerchant({ giviniStart: 50 })], { giviniStart: 50 })
    ).toEqual({
      price: 500000,
      profits: 200000,
      social: 0,
      givini: 5,
      takkan: 0,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 500000,
          profits: 200000,
          givini: 5,
        },
      ],
    });
    expect(
      combine(
        [
          giviniOrcMerchant({ giviniStart: 15 }),
          ...invs('Bank of Givini', 'War Monument'),
        ],
        { giviniStart: 15 }
      )
    ).toEqual({
      price: 1450000,
      profits: 400000,
      social: 3,
      givini: 20,
      takkan: 4,
      investments: [
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 100000,
          givini: 5,
        },
        {
          name: 'Bank of Givini',
          price: 350000,
          profits: 300000,
          givini: 5,
          takkan: 2,
        },
        {
          name: 'War Monument',
          price: 1000000,
          givini: 10,
          social: 3,
          profits: 0,
          takkan: 2,
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
    ).toMatchObject({ price: 0, profits: 0, investments: [] });
  });

  test('best is buying cheapest thing', () => {
    expect(
      best({
        investments: invs('Succubus Armorer', 'Givini Smithing'),
        money: 250000,
      })
    ).toMatchObject({
      price: 100000,
      profits: 10000,
      investments: invs('Succubus Armorer'),
    });
  });

  test('best is buying thing that makes the most money', () => {
    expect(
      best({
        investments: invs('Bank of Givini', 'Givini Smithing'),
        money: 400000,
      })
    ).toMatchObject({
      price: 350000,
      profits: 300000,
      investments: invs('Bank of Givini'),
    });
  });

  test('best is buying everything', () => {
    expect(
      best({
        investments: invs('Givini Smithing', 'Bank of Givini'),
        money: 600000,
      })
    ).toMatchObject({
      price: 550000,
      profits: 310000,
      investments: invs('Bank of Givini', 'Givini Smithing'),
    });
  });

  test('best is buying best social thingie', () => {
    expect(
      best({
        investments: invs('Booze Shack', 'Bank of Givini', 'Imp Offices'),
        money: 400000,
        otherRequirements: {
          social: 1,
        },
      })
    ).toMatchObject({
      price: 150000,
      profits: 50000,
      social: 1,
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
    ).toMatchObject({
      price: 203500,
      profits: 60000,
      investments: [
        {
          name: 'Givini Smithing',
          price: 200000,
          profits: 10000,
          givini: 2,
        },
        {
          name: 'Givini Banners + Givini Dragon Statue',
          price: 1000 + 2500,
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
    ).toMatchObject({
      price: 250000,
      profits: 125000,
      social: 1,
      investments: invs('Lonely Sailor Services'),
    });
  });

  test('it does not buy the statues if they are useless', () => {
    expect(
      best({
        investments: [
          giviniOrcMerchant({ giviniStart: 18 }),
          ...invs('Bank of Givini', 'Givini Banners + Givini Dragon Statue'),
        ],
        money: 500000,
        context: {
          giviniStart: 18,
          giviniExtra: 6,
        },
      })
    ).toMatchObject({
      price: 450000,
      profits: 400000,
      investments: [
        inv('Bank of Givini'),
        {
          name: 'Givini Orc Merchant',
          price: 100000,
          profits: 100000,
          givini: 5,
        },
      ],
    });
  });

  test('buys as much givini points as required', () => {
    expect(
      best({
        investments: invs(
          'Bank of Givini',
          'Givini Smithing',
          'Hall of Mental Strength'
        ),
        money: 600000,
        otherRequirements: {
          givini: 7,
        },
      })
    ).toMatchObject({
      price: 550000,
      profits: 310000,
      social: 0,
      givini: 7,
      investments: invs('Bank of Givini', 'Givini Smithing'),
    });
  });

  test('orc council bribe', () => {
    expect(
      best({
        investments: invs(
          'Hall of Mental Strength',
          'Bank of Stineford',
          'Imp Offices',
          'Orc Pools Upgrade',
          "Tradesmasher's Guild"
        ),
        money: 800000,
        otherRequirements: {
          orcCouncil: 0.8,
        },
        context: {
          takkan: 34,
          completedResearch: ['orc'],
        },
      })
    ).toMatchObject({
      investments: [
        {
          name: "Tradesmasher's Guild",
          price: 350000,
          profits: 50000,
          takkan: 5,
        },
        inv('Hall of Mental Strength'),
      ],
    });
  });

  test('reserve', () => {
    expect(
      best({
        investments: invs('Bank of Givini', 'Succubus Armorer'),
        money: 500000,
        otherRequirements: {
          reserve: 400000,
        },
      })
    ).toMatchObject({
      price: 350000,
      profits: 300000,
      investments: [inv('Bank of Givini')],
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
      ];

      const result = finest({
        previousInvestments,
        // Remaining + Profits
        money: 7500 + 2435000,
        otherRequirements: {
          social: 6,
          mandatory: [
            'Givini Orc Merchant',
            'Bank of Givini',
            'Bank of Stineford',
          ],
        },
        giviniStart: 18,
        giviniExtra: 6,
        chapter3Infrastructure: true,
        chapter1Bank: true,
      });

      expect(
        result.investments
          .map(({ name }) => name)
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(
        [
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
      ];

      const result = finest({
        previousInvestments,
        // Remaining + Profits - Cost of (unlisted) magic/military upgrades
        money: 42500 + 3262000 - 460000,
        giviniStart: 35,
        giviniExtra: 1,
        otherRequirements: {
          mandatory: ['Hall of Mental Strength', 'Orc Pools Upgrade'],
        },
        chapter1Bank: true,
      });

      expect(
        result.investments
          .map(({ name }) => name)
          .sort((a, b) => a.localeCompare(b))
      ).toEqual(
        [
          'Hall of Mental Strength',
          'Orc Pools Upgrade',
          "Cee'Kan Shipping",
          'Givini Teahouse Chain',
          'Succubus Armorer',
          'Yhilini Bank Core Lender',
          "Tradesmasher's Guild",
          'Theltiar Flowhouse',
        ].sort((a, b) => a.localeCompare(b))
      );
    });

    describe('banned', () => {
      test('it does not buy banned investments', () => {
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
        ];

        const result = finest({
          previousInvestments,
          money: 42500 + 3262000 - 460000,
          giviniStart: 35,
          giviniExtra: 1,
          otherRequirements: {
            mandatory: ['Hall of Mental Strength', 'Orc Pools Upgrade'],
            banned: ['Succubus Armorer'],
          },
        });

        expect(
          result.investments
            .map(({ name }) => name)
            .sort((a, b) => a.localeCompare(b))
        ).toEqual(
          [
            'Hall of Mental Strength',
            'Orc Pools Upgrade',
            "Cee'Kan Shipping",
            'Givini Teahouse Chain',
            'Yhilini Bank Core Lender',
            "Tradesmasher's Guild",
            'Theltiar Flowhouse',
          ].sort((a, b) => a.localeCompare(b))
        );
      });

      test('it ignores banned investments that are also mandatory or semi-mandatory', () => {
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
        ];

        const result = finest({
          previousInvestments,
          money: 42500 + 3262000 - 460000,
          giviniStart: 35,
          giviniExtra: 1,
          otherRequirements: {
            mandatory: ['Hall of Mental Strength', 'Orc Pools Upgrade'],
            banned: ['Succubus Armorer', 'Hall of Mental Strength'],
          },
        });

        expect(
          result.investments
            .map(({ name }) => name)
            .sort((a, b) => a.localeCompare(b))
        ).toEqual(
          [
            'Hall of Mental Strength',
            'Orc Pools Upgrade',
            "Cee'Kan Shipping",
            'Givini Teahouse Chain',
            'Yhilini Bank Core Lender',
            "Tradesmasher's Guild",
            'Theltiar Flowhouse',
          ].sort((a, b) => a.localeCompare(b))
        );
      });
    });
  });
});

describe('ardford restaurant', () => {
  test('owning restaurant, buying teahouse', () => {
    const result = finest({
      previousInvestments: ['Ardford Restaurant'],
      money: 275000,
      otherRequirements: {
        mandatory: ['Givini Teahouse Chain'],
      },
      list: 'gawnfall',
      gawnfallArdford: 'resolved',
    });

    expect(result.profits).toBe(45000);
  });

  test('owning restaurant, buying teahouse, but ardford closed', () => {
    const result = finest({
      previousInvestments: ['Ardford Restaurant'],
      money: 275000,
      otherRequirements: {
        mandatory: ['Givini Teahouse Chain'],
      },
      list: 'gawnfall',
    });

    expect(result.profits).toBe(30000);
  });

  test('owning teahouse, buying restaurant', () => {
    const result = finest({
      previousInvestments: ['Givini Teahouse Chain'],
      money: 100000,
      otherRequirements: {
        mandatory: ['Ardford Restaurant'],
      },
      list: 'gawnfall',
      gawnfallArdford: 'resolved',
    });

    expect(result.profits).toBe(25000);
  });
});
