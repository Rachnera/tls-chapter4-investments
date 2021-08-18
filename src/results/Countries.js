import { Card } from 'antd';

const Addition = ({ startingValue = 0, dataSources }) => {
  return (
    <table className="addition">
      <tbody>
        <tr>
          <td>{`Initial value`}</td>
          <td>{startingValue}</td>
          <td></td>
        </tr>
      </tbody>
      {dataSources.map(({ title, dataSource }, index) => {
        return (
          <tbody key={index.toString()}>
            <tr>
              <th colSpan="3" scope="col">
                {title}
              </th>
            </tr>
            {dataSource.map(({ label, values, explanation }, index) => {
              return (
                <tr key={index.toString()}>
                  <td>{label}</td>
                  <td>{values.map((value) => `+${value}`).join(' ')}</td>
                  <td>{explanation}</td>
                </tr>
              );
            })}
          </tbody>
        );
      })}
      <tfoot>
        <tr>
          <th scope="row">{`Total`}</th>
          <td>
            {startingValue +
              dataSources.reduce(
                (acc, { dataSource }) =>
                  acc +
                  dataSource.reduce(
                    (acc, { values }) =>
                      acc + values.reduce((acc, val) => acc + val),
                    0
                  ),
                0
              )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const startingValue = -5;

const initialStandings = ({ previousInvestments }) => {
  return [
    { label: `Petitions`, values: [5, 5, 2, 2, 2] },
    {
      label: `New Givini Trade`,
      values: [5, 1],
      explanation: `+5 when bought, +1 at round's start`,
    },
    previousInvestments.includes("Min's Trade Route") && {
      label: `Min's Trade Route`,
      values: [1],
    },
  ].filter(Boolean);
};

const nonInvestmentChanges = () => {
  return [
    { label: `Magical items`, values: [2] },
    { label: `Merchant dispute`, values: [1] },
    {
      label: `Givino Vinai equipment shop girl`,
      values: [1],
      explanation: `Score already ≥ 25`,
    },
    { label: `Givini king`, values: [1], explanation: `Score already ≥ 25` },
    {
      label: `New Givini Trade`,
      values: [1],
      explanation: `+1 at the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ];
};

const Countries = ({ previousInvestments = [], investments = [] }) => {
  return (
    <Card title={`Countries`}>
      <Card title={`New Givini`} type="inner">
        <Addition
          startingValue={startingValue}
          dataSources={[
            {
              title: `Chapter start`,
              dataSource: initialStandings({ previousInvestments }),
            },
            {
              title: `Investments`,
              dataSource: investments
                .filter(({ givini = 0 }) => givini !== 0)
                .map(({ name, givini }) => {
                  return { label: name, values: [givini] };
                })
                .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
            },
            {
              title: `Other changes`,
              dataSource: nonInvestmentChanges(),
            },
          ]}
        />
      </Card>
    </Card>
  );
};

export default Countries;
