import Ledger from './Ledger';
import { Card } from 'antd';
import Givini from './Givini';
import Takkan from './Takkan';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
  decisions,
}) => {
  return (
    <Card title={`Changes`} className="results">
      <Card title={`Ledger`} type="inner" className="ledger">
        <Ledger
          initialStandings={initialStandings}
          nonInvestmentChanges={nonInvestmentChanges}
          investmentChanges={investmentChanges}
        />
      </Card>
      <Card title={`Countries`} type="inner">
        <Card title={`New Givini`} type="inner">
          <Givini
            chapter3Investments={initialStandings.investments}
            roundOneInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
        <Card title={`Tak'Kan`} type="inner">
          <Takkan
            roundOneInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
      </Card>
    </Card>
  );
};

export default Result;
