import Ledger from '../../results/Ledger';
import { Card } from 'antd';
import Givini from './Givini';
import Takkan from './Takkan';
import Chalice from './Chalice';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
  decisions,
}) => {
  return (
    <Card title={`Changes`} className="results">
      <Ledger
        initialStandings={initialStandings}
        nonInvestmentChanges={nonInvestmentChanges}
        investmentChanges={investmentChanges}
      />
      <div>
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
        <Card title={`Chalice States`} type="inner">
          <Chalice
            chapter3Investments={initialStandings.investments}
            roundOneInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
      </div>
    </Card>
  );
};

export default Result;
