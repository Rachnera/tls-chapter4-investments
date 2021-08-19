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
        chapter3Investments={initialStandings.previousInvestments}
        roundOneInvestments={investmentChanges.investments}
      />
    </>
  );
};

export default Result;
