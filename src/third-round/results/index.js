import Ledger from '../../results/Ledger';
import { Card } from 'antd';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
}) => {
  return (
    <Card title={`Changes`} className="results">
      <Ledger
        initialStandings={initialStandings}
        nonInvestmentChanges={nonInvestmentChanges}
        investmentChanges={investmentChanges}
      />
    </Card>
  );
};

export default Result;
