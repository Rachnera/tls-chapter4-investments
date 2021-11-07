import { Table } from 'antd';
import { nF } from '../misc';

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

const renderPlus = (number) => `+${number}`;

const columns = [
  {
    title: `Upgrade`,
    dataIndex: 'key',
  },
  {
    title: `Price`,
    dataIndex: 'price',
    render: (number) => nF(number),
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: `Military`,
    dataIndex: 'military',
    render: renderPlus,
    sorter: (a, b) => a.military - b.military,
  },
  {
    title: `Magic`,
    dataIndex: 'magic',
    render: renderPlus,
    sorter: (a, b) => a.magic - b.magic,
  },
];

const dataSource = ({ research, military, magic }) => {
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
  const source = dataSource({ research, military, magic });

  return (
    <div className="headquarters-upgrades">
      <Table
        dataSource={source}
        columns={columns}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>{`Total`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(sum(source, 'price'))}
              </Table.Summary.Cell>
              <Table.Summary.Cell>{sum(source, 'military')}</Table.Summary.Cell>
              <Table.Summary.Cell>{sum(source, 'magic')}</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default Headquarters;
