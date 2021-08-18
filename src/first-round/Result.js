import { Table } from 'antd';

const nF = (number) => number.toLocaleString('en-US');

const NumberCell = ({ children, format }) => {
  const number = children;
  const formattedNumber = !!format ? nF(Math.abs(number)) : Math.abs(number);

  return `${number < 0 ? `-` : `+`} ${formattedNumber}`;
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
    },
    {
      title: `Profits`,
      dataIndex: 'profits',
      render: (profits) => nF(profits),
      sorter: (a, b) => a.profits - b.profits,
    },
    {
      title: `Social`,
      dataIndex: 'social',
      render: (social = 0) => <NumberCell>{social}</NumberCell>,
    },
    {
      title: `New Givini`,
      dataIndex: 'givini',
      render: (givini = 0) => <NumberCell>{givini}</NumberCell>,
    },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

const Total = ({
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
    },
    {
      title: `Profits`,
      dataIndex: 'profits',
      render,
    },
    {
      title: `Social`,
      dataIndex: 'social',
      render,
    },
    {
      title: `New Givini`,
      dataIndex: 'givini',
      render,
    },
  ];

  const sum = (key) =>
    initialStandings[key] + nonInvestmentChanges[key] + investmentChanges[key];

  const dataSource = [
    {
      ...initialStandings,
      key: 'base',
      category: `Base`,
    },
    {
      ...investmentChanges,
      key: 'investments',
      category: `Investments`,
      money: -investmentChanges.price,
    },
    {
      ...nonInvestmentChanges,
      key: 'other',
      category: `Other changes`,
    },
    {
      key: 'total',
      category: `Total`,
      money:
        initialStandings.money +
        nonInvestmentChanges.money -
        investmentChanges.price,
      profits: sum('profits'),
      social: sum('social'),
      givini: sum('givini'),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
}) => {
  const { investments } = investmentChanges;

  if (!investments?.length) {
    return <strong>{`TODO`}</strong>;
  }

  return (
    <>
      <Investments investments={investments} />
      <Total
        initialStandings={initialStandings}
        nonInvestmentChanges={nonInvestmentChanges}
        investmentChanges={investmentChanges}
      />
    </>
  );
};

export default Result;
