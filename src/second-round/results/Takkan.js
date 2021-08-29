import Addition from '../../results/Addition';
import { roundTwoChanges, council } from '../../data/takkan';
import { Typography } from 'antd';

const { Text } = Typography;

const Takkan = ({
  startingValue,
  roundTwoInvestments = [],
  decisions = {},
  roundOneResearch,
  previousInvestments = [],
  takkanScore,
}) => {
  const councilResult = council({
    researches: [roundOneResearch],
    investments: [
      ...previousInvestments,
      ...roundTwoInvestments.map(({ name }) => name),
    ],
    takkan: takkanScore,
  });

  return (
    <>
      <Addition
        startingValue={startingValue}
        dataSources={[
          {
            title: `Investments`,
            dataSource: roundTwoInvestments
              .filter(({ takkan = 0 }) => takkan !== 0)
              .map(({ name, takkan }) => {
                return { label: name, values: [takkan] };
              })
              .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
          },
          {
            title: `Other changes`,
            dataSource: roundTwoChanges(decisions),
          },
        ]}
      />
      <Text>
        {`Orc council: `}
        <Text type={councilResult > 0.8 ? 'success' : 'warning'}>
          {(councilResult * 100).toFixed(2)}
          {`%`}
        </Text>
      </Text>
    </>
  );
};

export default Takkan;
