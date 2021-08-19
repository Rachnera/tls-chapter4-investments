import Addition from './Addition';
import { startingValue, preliminaryChanges, roundOneChanges } from '../givini';

const Givini = ({ chapter3Investments = [], roundOneInvestments = [] }) => {
  return (
    <Addition
      startingValue={startingValue}
      dataSources={[
        {
          title: `Chapter start`,
          dataSource: preliminaryChanges({ investments: chapter3Investments }),
        },
        {
          title: `Investments`,
          dataSource: roundOneInvestments
            .filter(({ givini = 0 }) => givini !== 0)
            .map(({ name, givini }) => {
              return { label: name, values: [givini] };
            })
            .sort(({ label: a }, { label: b }) => a.localeCompare(b)),
        },
        {
          title: `Other changes`,
          dataSource: roundOneChanges(),
        },
      ]}
    />
  );
};

export default Givini;