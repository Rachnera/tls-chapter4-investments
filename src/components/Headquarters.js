import { Table } from 'antd';
import { nF } from '../misc';

const sum = (list, key) => list.reduce((acc, data) => acc + data[key], 0);
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

const Headquarters = ({
  dataSource,
  initialMilitary = 0,
  initialMagic = 0,
}) => {
  return (
    <div className="headquarters-upgrades">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>{`Total`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(sum(dataSource, 'price'))}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {initialMilitary + sum(dataSource, 'military')}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {initialMagic + sum(dataSource, 'magic')}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default Headquarters;
