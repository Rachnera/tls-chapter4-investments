import Ledger from '../../results/Ledger';
import { Card } from 'antd';
import Givini from './Givini';
import Takkan from './Takkan';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
  decisions,
  finalStandings,
  roundOneDecisions,
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
            takkanScore={finalStandings.takkan}
            roundOneResearch={roundOneDecisions.research}
            previousInvestments={initialStandings.investments}
          />
        </Card>
      </Card>
    </Card>
  );
};

export default Result;
