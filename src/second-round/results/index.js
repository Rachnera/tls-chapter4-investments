import Ledger from '../../results/Ledger';
import { Card } from 'antd';
import Givini from './Givini';
import Takkan from './Takkan';

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
            startingValue={initialStandings.givini}
            roundTwoInvestments={investmentChanges.investments}
            decisions={decisions}
          />
        </Card>
        <Card title={`Tak'Kan`} type="inner">
          <Takkan
            startingValue={initialStandings.takkan}
            roundTwoInvestments={investmentChanges.investments}
            decisions={decisions}
            takkanScore={initialStandings.takkan + investmentChanges.takkan}
            roundOneResearch={roundOneDecisions.research}
            previousInvestments={initialStandings.investments}
          />
        </Card>
      </div>
    </Card>
  );
};

export default Result;
