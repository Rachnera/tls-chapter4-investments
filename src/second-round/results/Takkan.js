import Addition from '../../results/Addition';
import { roundTwoChanges } from '../../data/takkan';

const Takkan = ({
  startingValue,
  roundTwoInvestments = [],
  decisions = {},
}) => {
  return (
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
  );
};

export default Takkan;
