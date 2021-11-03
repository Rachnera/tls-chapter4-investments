import Ledger from '../results/Ledger';
import { Card } from 'antd';
import Addition from '../results/Addition';
import { roundThreeChanges as giviniRoundThreeChanges } from '../data/givini';
import { roundThreeChanges as takkanRoundThreeChanges } from '../data/takkan';

const filterInvestmentsByCountry = (investments, country) => {
  return investments
    .filter((inv) => !!inv[country])
    .map((inv) => {
      return { label: inv['name'], values: [inv[country]] };
    })
    .sort(({ label: a }, { label: b }) => a.localeCompare(b));
};

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
  decisions,
}) => {
  const investments = investmentChanges.investments;

  return (
    <Card title={`Changes`} className="results">
      <Ledger
        initialStandings={initialStandings}
        nonInvestmentChanges={nonInvestmentChanges}
        investmentChanges={investmentChanges}
      />
      <div>
        <Card title={`New Givini`} type="inner">
          <Addition
            startingValue={initialStandings.givini}
            dataSources={[
              {
                title: `Investments`,
                dataSource: filterInvestmentsByCountry(investments, 'givini'),
              },
              {
                title: `Other changes`,
                dataSource: giviniRoundThreeChanges(decisions),
              },
            ]}
          />
        </Card>
        <Card title={`Tak'Kan`} type="inner">
          <Addition
            startingValue={initialStandings.takkan}
            dataSources={[
              {
                title: `Investments`,
                dataSource: filterInvestmentsByCountry(investments, 'takkan'),
              },
              {
                title: `Other changes`,
                dataSource: takkanRoundThreeChanges(decisions),
              },
            ]}
          />
        </Card>
      </div>
    </Card>
  );
};

export default Result;
