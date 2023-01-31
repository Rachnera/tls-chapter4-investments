import BaseHeadquarters from '../components/Headquarters'

const base = [
  {
    key: `Tower Little Girl talk`,
    magic: 1,
    military: 0,
    price: 0,
  },
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
];

const defense = [
  {
    key: `Research: Base Defense`,
    military: 5,
    magic: 10,
    price: 0,
  },
];

const subsitute = [
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
];

const plusTenMilitary = [
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
];

const plusFifteenMilitary = [
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
];

export const dataSource = ({ research, military, magic }) => {
  if (research === 'defense') {
    if (military <= 10 && magic === 20) {
      return [...defense, ...base];
    }

    if (military === 20 && magic <= 10) {
      return [...defense, ...plusFifteenMilitary];
    }

    if (military === 20 && magic === 20) {
      return [...defense, ...base, ...plusTenMilitary];
    }
  }

  if (military <= 10 && magic === 20) {
    return [...base, ...subsitute];
  }

  if (military === 20 && magic <= 10) {
    return [...base, ...plusFifteenMilitary];
  }

  if (military === 20 && magic === 20) {
    return [...base, ...subsitute, ...plusTenMilitary];
  }

  throw new Error('Unsupported');
};
const sum = (list, key) => list.reduce((acc, data) => acc + data[key], 0);

export const price = (params) => sum(dataSource(params), 'price');

const Headquarters = ({ research, military, magic }) => {
  return (
    <BaseHeadquarters dataSource={dataSource({ research, military, magic })}/>
  );
};

export default Headquarters;
