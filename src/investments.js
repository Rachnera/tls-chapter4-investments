// Ref: https://thelastsovereign.miraheze.org/wiki/Investments

const investments = [
  {
    name: 'Bank of Stineford',
    price: 400000,
    profits: 240000,
    country: 'Stineford/Feroholm',
  },
  {
    name: 'Stineford Weapons Store',
    price: 200000,
    profits: 75000,
    country: 'Stineford/Feroholm',
  },
  {
    name: 'Trading Pillar Rights',
    price: 300000,
    profits: 100000,
    country: 'Stineford/Feroholm',
  },
  {
    name: 'Stineford Succubus Tower',
    price: 800000,
    country: 'Stineford/Feroholm',
    social: 2,
  },
  {
    name: 'Yhilini Airship Fleet',
    price: 1000000,
    country: 'Ari-Yhilina',
    profits: 100000,
  },
  {
    name: "Min's Trade Route",
    price: 400000,
    profits: 185000,
    country: 'Ari-Yhilina',
    givini: 1,
  },
  {
    name: 'Yhilini Succubi Trade',
    price: 400000,
    profits: 200000,
    country: 'Ari-Yhilina',
  },
  {
    name: 'Yhilini Brothel Reform',
    price: 25000,
    profits: 35000,
    country: 'Ari-Yhilina',
  },
  {
    name: 'Yhilini Bank Core Lender',
    price: 450000,
    profits: 150000,
    country: 'Ari-Yhilina',
  },
  {
    name: 'Mercenary Offices',
    price: 150000,
    profits: 15000,
    country: 'Ari-Yhilina',
    social: 2,
  },
  {
    name: 'Theltiar Rentals',
    price: 425000,
    profits: 95000,
    country: 'Sylvan',
    social: 1,
  },
  {
    name: 'Theltiar Flowhouse',
    price: 250000,
    profits: 80000,
    country: 'Sylvan',
  },
  {
    name: 'Denmiel Mushrooms',
    price: 105000,
    profits: 40000,
    country: 'Sylvan',
  },
  {
    name: 'Denmiel Archives',
    price: 250000,
    profits: 20000,
    country: 'Sylvan',
    social: 1,
  },
  {
    name: 'Eustrin Guild',
    price: 600000,
    profits: 250000,
    country: 'Eustrin',
  },
  {
    name: 'Succubus Armorer',
    price: 100000,
    profits: 10000,
    country: 'Chalice States',
  },
  {
    name: 'Gasm Falls Trade',
    price: 275000,
    profits: 110000,
    country: 'Chalice States',
  },
  {
    name: 'Givini Tunnels',
    price: 1500000,
    profits: 300000,
    country: 'Chalice States',
    givini: 3,
  },
  {
    name: 'Lustlord Temples',
    price: 50000 + 750000,
    profits: 50000,
    country: 'Chalice States',
  },
  {
    name: 'Succubus Band Tour',
    price: 100000,
    profits: 2000,
    country: 'Chalice States',
    givini: 2,
    social: 1,
  },
  {
    name: 'Gasm Falls Water Cleanup',
    price: 250000,
    country: 'Chalice States',
    social: 1,
  },
  {
    name: 'Orc Tunnels',
    price: 200000,
    country: 'Chalice States',
    social: 1,
  },
  {
    name: 'Givini Smithing',
    price: 200000,
    profits: 10000,
    country: 'New Givini',
    givini: 2,
  },
  {
    name: 'Givini Orc Merchant',
    country: 'New Givini',
    price: ({ baseStats }) => {
      const newGiviniScore = baseStats?.givini || 0;
      if (newGiviniScore < 20) {
        return 100000;
      }
      if (newGiviniScore < 25) {
        return 200000;
      }
      if (newGiviniScore < 35) {
        return 300000;
      }
      if (newGiviniScore < 45) {
        return 400000;
      }
      return 500000;
    },
    profits: ({ baseStats, additionalStats, investments }) => {
      const newGiviniScore =
        (baseStats?.givini || 0) +
        (additionalStats?.givini || 0) +
        investments.reduce((acc, investment) => {
          return acc + (investment?.givini || 0);
        }, 0);
      if (newGiviniScore < 20) {
        return 25000;
      }
      if (newGiviniScore < 30) {
        return 50000;
      }
      if (newGiviniScore < 40) {
        return 100000;
      }
      if (newGiviniScore < 50) {
        return 150000;
      }
      return 200000;
    },
    givini: 5,
  },
  {
    name: 'Givini Teahouse Chain',
    price: 275000,
    profits: 30000,
    country: 'New Givini',
    givini: 2,
    social: 1,
  },
  {
    name: 'Bank of Givini',
    price: 350000,
    profits: 300000,
    country: 'New Givini',
    givini: 5,
  },
  {
    name: 'Givini Mage Guild',
    price: 1000000,
    profits: 40000,
    country: 'New Givini',
    givini: 5,
  },
  {
    name: 'War Monument',
    price: 1000000,
    country: 'New Givini',
    givini: 10,
    social: 3,
  },
  {
    name: "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
    price: 1000000 + 100000,
    profits: 50000 + 50000,
    country: "Tak'Kan",
    social: 1,
  },
  {
    name: 'Hall of Mental Strength',
    price: 200000,
    profits: 25000,
    country: "Tak'Kan",
    social: 1,
  },
  {
    name: 'Booze Shack',
    price: 150000,
    profits: 50000,
    country: "Tak'Kan",
    social: 1,
  },
  {
    name: "Tradesmasher's Guild",
    price: 350000,
    profits: ({ investments, previousInvestments }) => {
      const guildScore =
        1 +
        [...previousInvestments, ...investments].filter(({ name }) => {
          return [
            "Cee'Kan Shipping",
            'Lonely Sailor Services',
            'Givini Orc Merchant',
            'Orcish Democracy',
            'Orc Pools Upgrade',
          ].includes(name);
        }).length;

      if (guildScore < 2) {
        return 50000;
      }
      if (guildScore === 2) {
        return 75000;
      }
      if (guildScore === 3) {
        return 125000;
      }
      if (guildScore === 4) {
        return 150000;
      }
      if (guildScore === 5) {
        return 175000;
      }
      return 200000;
    },
    country: "Tak'Kan",
  },
  {
    name: 'Lonely Sailor Services',
    price: 250000,
    profits: 100000,
    country: "Tak'Kan",
    social: 1,
  },
  {
    name: "Cee'Kan Shipping",
    price: 700000,
    profits: 200000,
    country: "Tak'Kan",
  },
  {
    name: 'Orcish Democracy',
    price: 1000000,
    country: "Tak'Kan",
    social: 5,
  },
  {
    name: 'Imp Offices',
    price: 100000,
    country: "Tak'Kan",
    social: 1,
  },
  {
    name: 'Orc Pools Upgrade',
    price: 500000,
    country: "Tak'Kan",
    social: 2,
  },
  {
    name: 'Givini Banners + Givini Dragon Statue',
    price: 1000 + 2500,
    country: 'New Givini',
    givini: 1,
  },
];

export default investments;
