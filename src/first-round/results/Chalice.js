import Addition from '../../results/Addition';
import {
  startingValue,
  preliminaryChanges,
  roundOneChanges,
} from '../../data/chalice';

const Chalice = ({
  chapter3Investments = [],
  roundOneInvestments = [],
  decisions = {},
}) => {
  return (
    <Addition
      startingValue={startingValue}
      dataSources={[
        {
          title: `Chapter start`,
          dataSource: preliminaryChanges({
            initialInvestments: chapter3Investments,
          }),
        },
        {
          title: `Investments`,
          dataSource: roundOneInvestments
            .filter(({ chalice = 0 }) => chalice !== 0)
            .map(({ name, chalice }) => {
              return { label: name, values: [chalice] };
            })
            .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
        },
        {
          title: `Other changes`,
          dataSource: roundOneChanges(decisions),
        },
      ]}
    />
  );
};

export default Chalice;
