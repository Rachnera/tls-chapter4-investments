import { combinations } from './math';

const sum = (list, key) => list.reduce((acc, data) => acc + data[key], 0);

const free = [
  {
    key: `Tower Little Girl talk`,
    magic: 1,
    military: 0,
    price: 0,
  },
  {
    key: `Wendis and Wynn reunion`,
    magic: 1,
    military: 0,
    price: 0,
  },
];

const buyable = [
  {
    key: `Deluxe Givini Dragon Statue`,
    magic: 1,
    military: 0,
    price: 5000,
  },
  {
    key: `HQ Shrine`,
    magic: 1,
    military: 0,
    price: 5000,
  },
  {
    key: `Orc Lab Upgrade`,
    magic: 2,
    military: 5,
    price: 25000,
  },
  {
    key: `Magical Shielding Upgrade`,
    magic: 5,
    military: 0,
    price: 100000,
  },
  {
    key: `Wynn's Shield Upgrade`,
    magic: 5,
    military: 0,
    price: 100000,
  },
  {
    key: `Extradimensional Foundation`,
    magic: 5,
    military: 5,
    price: 225000,
  },
  {
    key: `Armory Upgrade`,
    military: 5,
    magic: 0,
    price: 10000,
  },
  {
    key: `Orc Guard Posts`,
    military: 3,
    magic: 0,
    price: 5000,
  },
  {
    key: `Supplies Upgrade`,
    military: 2,
    magic: 0,
    price: 10000,
  },
  {
    key: `Second Well`,
    military: 3,
    magic: 0,
    price: 10000,
  },
  {
    key: `Iron Cudgel`,
    military: 4,
    magic: 0,
    price: 15000,
  },
  {
    key: `Entity's Shield Upgrade`,
    military: 5,
    magic: 10,
    price: 250000,
  },
];

const availableUpgrades = ({ alreadyBought, openingRuins, researchedDefense }) => {
  const alreadyBoughtShortlist = alreadyBought.map(({ key }) => key);

  return [
    ...free,
    ...buyable,
    openingRuins && {
      key: `Givini Ruins throne`,
      magic: 1,
      military: 0,
      price: 0,
    },
    researchedDefense && {
      key: `Research: Base Defense`,
      military: 5,
      magic: 10,
      price: 0,
    },
  ]
    .filter(Boolean)
    .filter(({ key }) => !alreadyBoughtShortlist.includes(key));
};

const keyify = (array) => array.join('/')

export const headquartersUpgradesForTargets = ({
  targets,
  alreadyBought,
}) => {
  // TODO
  const openingRuins = true;
  const researchedDefense = false;

  const currentMilitary = sum(alreadyBought, 'military')
  const currentMagic = sum(alreadyBought, 'magic')

  const available = availableUpgrades({ alreadyBought, openingRuins, researchedDefense });

  const free = available.filter(({ price }) => price === 0);
  const remain = available.filter(({ price }) => price > 0);

  const updatedMilitary = currentMilitary + sum(free, 'military');
  const updatedMagic = currentMagic + sum(free, 'magic');


  const candidates = {};
  combinations(remain).forEach((comb) => {
    targets.forEach((target) => {
      const [targetMilitary, targetMagic] = target;
      if (
        sum(comb, 'magic') >= (targetMagic - updatedMagic) &&
        sum(comb, 'military') >= (targetMilitary - updatedMilitary)
      ) {
        const key = keyify(target);
        if (!candidates[key] || sum(candidates[key], 'price') > sum(comb, 'price')) {
          candidates[key] = comb;
        }
      }
    })


  });

  targets.forEach((target) => {
    const key = keyify(target);
    candidates[key] = [...free, ...candidates[key]]
  })

  return candidates;
};


