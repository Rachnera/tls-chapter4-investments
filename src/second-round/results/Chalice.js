import Addition from '../../results/Addition';
import { roundTwoChanges } from '../../data/chalice';

const Chalice = ({
  initialStandings,
  roundTwoInvestments = [],
  decisions = {},
}) => {
  return (
    <Addition
      startingValue={initialStandings.chalice}
      dataSources={[
        {
          title: `Investments`,
          dataSource: roundTwoInvestments
            .filter(({ chalice = 0 }) => chalice !== 0)
            .map(({ name, chalice }) => {
              return { label: name, values: [chalice] };
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

export default Chalice;
