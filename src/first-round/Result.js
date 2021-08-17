import { Table, Typography } from 'antd';

const { Text } = Typography;

const nF = (number) => number.toLocaleString('en-US');

const Stat = ({ value }) => {
  if (!value) {
    return <Text type="secondary">{`/`}</Text>;
  }

  return <Text>{`+${value}`}</Text>;
};

const Result = ({ input, output }) => {
  const { investments } = output;

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
        const totalGivini = investments.reduce(
          (acc, { givini = 0 }) => acc + givini,
          0
        );

        const { startingSocial } = input;

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell>{`Base`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(input.baseProfit + input.remainingPron)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>{nF(input.baseProfit)}</Table.Summary.Cell>
              <Table.Summary.Cell>{startingSocial || `???`}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>{`New`}</Table.Summary.Cell>
              <Table.Summary.Cell>{`- ${nF(output.price)}`}</Table.Summary.Cell>
              <Table.Summary.Cell>{`+ ${nF(
                output.profits
              )}`}</Table.Summary.Cell>
              <Table.Summary.Cell>{`+${output.social}`}</Table.Summary.Cell>
              <Table.Summary.Cell>{`+${totalGivini}`}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>{`Total`}</Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(input.baseProfit + input.remainingPron - output.price)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {nF(input.baseProfit + output.profits)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {startingSocial ? startingSocial + output.social : `???`}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
};

export default Result;
