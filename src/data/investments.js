// Ref: https://thelastsovereign.miraheze.org/wiki/Investments

const investments = [
  {
    name: 'Bank of Stineford',
    price: 400000,
    profits: 240000,
  },
  {
    name: 'Stineford Weapons Store',
    price: 200000,
    profits: 75000,
  },
  {
    name: 'Trading Pillar Rights',
    price: 300000,
    profits: 100000,
  },
  {
    name: 'Stineford Succubus Tower',
    price: 800000,
    social: 2,
  },
  {
    name: 'Yhilini Airship Fleet',
    price: 1000000,
    profits: 100000,
  },
  {
    name: "Min's Trade Route",
    price: 400000,
    profits: 185000,
    givini: 1,
  },
  {
    name: 'Yhilini Succubi Trade',
    price: ({ chapter3Infrastructure }) =>
      chapter3Infrastructure ? 400000 : 550000,
    profits: 200000,
  },
  {
    name: 'Yhilini Brothel Reform',
    price: 25000,
    profits: 35000,
  },
  {
    name: 'Premium Steel Owner',
    price: ({ chapter1Steel }) => (!!chapter1Steel ? 75000 : 100000),
    profits: 10000,
  },
  {
    name: 'Yhilini Bank Core Lender',
    price: ({ chapter1Bank }) => (!!chapter1Bank ? 450000 : 500000),
    profits: 150000,
  },
  {
    name: 'Mercenary Offices',
    price: ({ chapter3Infrastructure }) =>
      chapter3Infrastructure ? 150000 : 250000,
    profits: 15000,
    social: 2,
  },
  {
    name: 'Theltiar Rentals',
    price: 425000,
    profits: 95000,
    social: 1,
  },
  {
    name: 'Theltiar Flowhouse',
    price: 250000,
    profits: 80000,
  },
  {
    name: 'Denmiel Mushrooms',
    price: 105000,
    profits: 40000,
  },
  {
    name: 'Denmiel Archives',
    price: 250000,
    profits: 20000,
    social: 1,
  },
  {
    name: 'Eustrin Guild',
    price: 600000,
    profits: 250000,
  },
  {
    name: 'Succubus Armorer',
    price: 100000,
    profits: 10000,
  },
  {
    name: 'Gasm Falls Trade',
    price: 275000,
    profits: 110000,
  },
  {
    name: 'Givini Tunnels',
    price: 1500000,
    profits: 300000,
    givini: 3,
    takkan: 3,
  },
  {
    name: 'Lustlord Statues + Lustlord Temples',
    price: 50000 + 750000,
    profits: 50000,
  },
  {
    name: 'Succubus Band Tour',
    price: 100000,
    profits: 2000,
    givini: 2,
    social: 1,
    takkan: 2,
  },
  {
    name: 'Gasm Falls Water Cleanup',
    price: 250000,
    social: 1,
  },
  {
    name: 'Orc Tunnels',
    price: 200000,
    social: 1,
  },
  {
    name: 'Givini Smithing',
    price: 200000,
    profits: 10000,
    givini: 2,
  },
  {
    name: 'Givini Orc Merchant',
    price: ({ giviniStart: newGiviniScore = 0 }) => {
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
    profits: ({ giviniStart = 0, giviniExtra = 0, investments }) => {
      const newGiviniScore =
        giviniStart +
        giviniExtra +
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
    givini: 2,
    social: 1,
    takkan: 1,
  },
  {
    name: 'Bank of Givini',
    price: 350000,
    profits: 300000,
    givini: 5,
    takkan: 2,
  },
  {
    name: 'Givini Mage Guild',
    price: 1000000,
    profits: 40000,
    givini: 5,
  },
  {
    name: 'War Monument',
    price: 1000000,
    givini: 10,
    social: 3,
    takkan: 2,
  },
  {
    name: "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
    price: 1000000 + 100000,
    profits: 50000 + 50000,
    social: 1,
    takkan: 5 + 2,
  },
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
  {
    name: "Tradesmasher's Guild",
    price: 350000,
    profits: ({ investments, previousInvestments = [] }) => {
      const guildScore =
        1 +
        [...previousInvestments, ...investments.map(({ name }) => name)].filter(
          (name) => {
            return [
              "Cee'Kan Shipping",
              'Lonely Sailor Services',
              'Givini Orc Merchant',
              'Orcish Democracy',
              'Orc Pools Upgrade',
            ].includes(name);
          }
        ).length;

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
    takkan: 5,
  },
  {
    name: 'Lonely Sailor Services',
    price: 250000,
    profits: 100000,
    social: 1,
    takkan: 5,
  },
  {
    name: "Cee'Kan Shipping",
    price: 700000,
    profits: 200000,
    takkan: 5,
  },
  {
    name: 'Orcish Democracy',
    price: 1000000,
    social: 5,
    takkan: 10,
  },
  {
    name: 'Imp Offices',
    price: 100000,
    social: 1,
    takkan: 1,
  },
  {
    name: 'Orc Pools Upgrade',
    price: 500000,
    social: 2,
    takkan: 5,
  },
  {
    name: 'Givini Banners + Givini Dragon Statue',
    price: 1000 + 2500,
    givini: 1,
  },
  {
    name: 'Orcish Drake Statue + Orcish Gargoyle Statue + Orcish Golden Drake Statue',
    price: 1000 + 2000 + 5000,
    takkan: 1,
  },
];

export default investments;
