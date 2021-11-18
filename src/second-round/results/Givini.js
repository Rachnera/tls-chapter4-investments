import Addition from '../../results/Addition';
import { roundTwoChanges } from '../../data/givini';

const Givini = ({
  initialStandings,
  roundTwoInvestments = [],
  decisions = {},
}) => {
  return (
    <Addition
      startingValue={initialStandings.givini}
      dataSources={[
        {
          title: `Investments`,
          dataSource: roundTwoInvestments
            .filter(({ givini = 0 }) => givini !== 0)
            .map(({ name, givini }) => {
              return { label: name, values: [givini] };
            })
            .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
        },
        {
          title: `Other changes`,
          dataSource: roundTwoChanges(decisions, initialStandings.investments),
        },
      ]}
    />
  );
};

export default Givini;
