import { Table } from 'antd';

const nF = (number) => number.toLocaleString('en-US');

const numberColWidth = 120;

const NumberCell = ({ children, format }) => {
  const number = children;
  const formattedNumber = !!format ? nF(Math.abs(number)) : Math.abs(number);

  return `${number < 0 ? `-` : `+`}${formattedNumber}`;
};

const Investments = ({ investments }) => {
  const dataSource = investments.map(({ name, ...data }) => {
    return {
      key: name,
      name,
      ...data,
    };
  });

  const columns = [
    {
      title: `Name`,
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: `Price`,
      dataIndex: 'price',
      render: (price) => nF(price),
      sorter: (a, b) => a.price - b.price,
      width: numberColWidth,
    },
    {
      title: `Profits`,
      dataIndex: 'profits',
      render: (profits) => nF(profits),
      sorter: (a, b) => a.profits - b.profits,
      width: numberColWidth,
    },
    {
      title: `Social`,
      dataIndex: 'social',
      render: (social = 0) => <NumberCell>{social}</NumberCell>,
      width: numberColWidth,
    },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

const Others = ({ list = [] }) => {
  const dataSource = list.map(({ name, ...data }) => {
    return {
      key: name,
      name,
      ...data,
    };
  });

  const render = (value = 0) => <NumberCell format={true}>{value}</NumberCell>;

  const columns = [
    {
      title: `Name`,
      dataIndex: 'name',
    },
    {
      title: `Price`,
      dataIndex: 'price',
      render,
      width: numberColWidth,
    },
    {
      title: `Profits`,
      dataIndex: 'profits',
      render,
      width: numberColWidth,
    },
    {
      title: `Social`,
      dataIndex: 'social',
      render,
      width: numberColWidth,
    },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

const Ledger = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
}) => {
  const render = (value, { key }) => {
    if (['base', 'total'].includes(key)) {
      return nF(value);
    }
    return <NumberCell format={true}>{value}</NumberCell>;
  };

  const columns = [
    {
      dataIndex: 'category',
    },
    {
      title: `ProN`,
      dataIndex: 'money',
      render,
      width: numberColWidth,
    },
    {
      title: `Profits`,
      dataIndex: 'profits',
      render,
      width: numberColWidth,
    },
    {
      title: `Social`,
      dataIndex: 'social',
      render,
      width: numberColWidth,
    },
  ];

  const sum = (key) =>
    initialStandings[key] + nonInvestmentChanges[key] + investmentChanges[key];

  const dataSource = [
    {
      ...initialStandings,
      key: 'base',
      category: `Previously`,
    },
    {
      key: 'previous_investments',
      category: `Start of the round`,
      money: initialStandings.profits,
      profits: 0,
      social: 0,
    },
    {
      ...investmentChanges,
      key: 'investments',
      category: `Changes from new investments`,
      money: -investmentChanges.price,
    },
    {
      ...nonInvestmentChanges,
      key: 'other',
      category: `Other changes`,
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered={true}
      expandable={{
        expandedRowRender: ({ key }) => {
          if (key === 'investments') {
            return <Investments investments={investmentChanges.investments} />;
          }
          if (key === 'other') {
            return <Others list={nonInvestmentChanges.list} />;
          }
          return null;
        },
        rowExpandable: ({ key }) => {
          if (key === 'investments') {
            return true;
          }

          if (key === 'other' && !!nonInvestmentChanges.list?.length) {
            return true;
          }

          return false;
        },
        defaultExpandAllRows: true,
      }}
      summary={() => {
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell
              colSpan={2}
            >{`Standings at the end of the round`}</Table.Summary.Cell>
            <Table.Summary.Cell>
              {nF(
                initialStandings.money +
                  initialStandings.profits +
                  nonInvestmentChanges.money -
                  investmentChanges.price
              )}
            </Table.Summary.Cell>
            <Table.Summary.Cell>{nF(sum('profits'))}</Table.Summary.Cell>
            <Table.Summary.Cell>{sum('social')}</Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default Ledger;
