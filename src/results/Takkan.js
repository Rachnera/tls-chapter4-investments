import Addition from './Addition';
import {
  startingValue,
  preliminaryChanges,
  roundOneChanges,
} from '../data/takkan';

const Takkan = ({ roundOneInvestments = [], decisions = {} }) => {
  return (
    <Addition
      startingValue={startingValue}
      dataSources={[
        {
          title: `Chapter start`,
          dataSource: preliminaryChanges(),
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
          dataSource: roundOneChanges(decisions),
        },
      ]}
    />
  );
};

export default Takkan;
