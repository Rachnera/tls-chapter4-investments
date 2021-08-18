import Ledger from './Ledger';
import Countries from './Countries';

const Result = ({
  initialStandings,
  nonInvestmentChanges,
  investmentChanges,
}) => {
  return (
    <>
      <Ledger
        initialStandings={initialStandings}
        nonInvestmentChanges={nonInvestmentChanges}
        investmentChanges={investmentChanges}
      />
      <Countries
        previousInvestments={initialStandings.previousInvestments}
        investments={investmentChanges.investments}
      />
    </>
  );
};

export default Result;
