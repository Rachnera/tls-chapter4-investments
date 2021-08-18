import { Table, Typography } from 'antd';

const { Text } = Typography;

const nF = (number) => number.toLocaleString('en-US');

const Stat = ({ value }) => {
  if (!value) {
    return <Text type="secondary">{`/`}</Text>;
  }

  return <Text>{`+${value}`}</Text>;
};

const PlusCell = ({ children }) => {
  return <Table.Summary.Cell>{`+ ${children}`}</Table.Summary.Cell>;
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
      render: (social) => {
        return <Stat value={social} />;
      },
    },
    {
      title: `New Givini Score`,
      dataIndex: 'givini',
      render: (givini) => {
        return <Stat value={givini} />;
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      summary={() => {
        const sum = (key) =>
          initialStandings[key] +
          nonInvestmentChanges[key] +
          investmentChanges[key];

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell>{`Base`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(initialStandings.money)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(initialStandings.profits)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>{initialStandings.social}</Table.Summary.Cell>
              <Table.Summary.Cell>{initialStandings.givini}</Table.Summary.Cell>
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell>{`New investments`}</Table.Summary.Cell>
              <Table.Summary.Cell>{`- ${nF(
                investmentChanges.price
              )}`}</Table.Summary.Cell>
              <PlusCell>{nF(investmentChanges.profits)}</PlusCell>
              <PlusCell>{investmentChanges.social}</PlusCell>
              <PlusCell>{investmentChanges.givini}</PlusCell>
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell>{`Other changes`}</Table.Summary.Cell>
              <PlusCell>{nF(nonInvestmentChanges.money)}</PlusCell>
              <PlusCell>{nF(nonInvestmentChanges.profits)}</PlusCell>
              <PlusCell>{nonInvestmentChanges.social}</PlusCell>
              <PlusCell>{nonInvestmentChanges.givini}</PlusCell>
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell>{`Total`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(
                  initialStandings.money +
                    nonInvestmentChanges.money -
                    investmentChanges.price
                )}
              </Table.Summary.Cell>
              <Table.Summary.Cell>{nF(sum('profits'))}</Table.Summary.Cell>
              <Table.Summary.Cell>{sum('social')}</Table.Summary.Cell>
              <Table.Summary.Cell>{sum('givini')}</Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
};

export default Result;
