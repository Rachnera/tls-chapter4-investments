import Ledger from '../../results/Ledger';
import { Card } from 'antd';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
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
    </Card>
  );
};

export default Result;
