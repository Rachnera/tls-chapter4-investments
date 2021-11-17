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
  roundOneDecisions,
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
            initialStandings={initialStandings}
            roundTwoInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
        <Card title={`Tak'Kan`} type="inner">
          <Takkan
            initialStandings={initialStandings}
            roundTwoInvestments={investmentChanges.investments}
            decisions={decisions}
            takkanScore={initialStandings.takkan + investmentChanges.takkan}
            roundOneResearch={roundOneDecisions.research}
          />
        </Card>
        <Card title={`Chalice States`} type="inner">
          <Chalice
            initialStandings={initialStandings}
            roundTwoInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
      </div>
    </Card>
  );
};

export default Result;
