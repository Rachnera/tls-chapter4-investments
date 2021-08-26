import Form from './Form';
import { buildFinalStandings } from '../misc';
import Result from './results';

const onFinish = async ({
  setResult,
  runInWoker,
  setError,
  firstRoundResult,
}) => {
  const { finalStandings: initialStandings, misc } = firstRoundResult;

  const decisions = {};

  const nonInvestmentChanges = {
    money: 0,
    profits: 0,
    social: 0,
    givini: 0,
    list: [],
  };

  const giviniStart = initialStandings.givini;
  const giviniExtra = 1; //FIXME Actual value is dependant from first round merchant decision

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money: initialStandings.money + initialStandings.profits,
    giviniStart,
    giviniExtra,
  };

  const result = await runInWoker(params);

  if (!result) {
    setResult(undefined);
    setError(
      `Couldn't find a working combination of investments for that strategy with these starting values, sorry.`
    );
    return;
  }

  const investmentChanges = { ...result, money: -result.price };

  setResult({
    initialStandings,
    decisions,
    nonInvestmentChanges,
    investmentChanges,
    finalStandings: buildFinalStandings({
      initialStandings,
      nonInvestmentChanges,
      investmentChanges,
    }),
    misc,
  });
};

const FirstRound = ({
  runInWoker,
  loading,
  result,
  setResult,
  setError,
  firstRoundResult,
}) => {
  return (
    <>
      <Form
        onFinish={() => {
          onFinish({
            setResult,
            runInWoker,
            setError,
            firstRoundResult,
          });
        }}
        loading={loading}
      />
      {result && <Result {...result} />}
    </>
  );
};

export default FirstRound;
