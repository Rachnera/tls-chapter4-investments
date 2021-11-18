import Addition from '../../results/Addition';
import {
  startingValue,
  preliminaryChanges,
  roundOneChanges,
} from '../../data/takkan';

const Takkan = ({
  roundOneInvestments = [],
  decisions = {},
  chapter3Investments = [],
}) => {
  return (
    <Addition
      startingValue={startingValue}
      dataSources={[
        {
          title: `Chapter start`,
          dataSource: preliminaryChanges(chapter3Investments),
        },
        {
          title: `Investments`,
          dataSource: roundOneInvestments
            .filter(({ takkan = 0 }) => takkan !== 0)
            .map(({ name, takkan }) => {
              return { label: name, values: [takkan] };
            })
            .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
        },
        {
          title: `Other changes`,
          dataSource: roundOneChanges(decisions, chapter3Investments),
        },
      ]}
    />
  );
};

export default Takkan;
