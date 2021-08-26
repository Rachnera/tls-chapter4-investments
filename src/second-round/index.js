import Form from './Form';
import { buildFinalStandings } from '../misc';
import Result from './results';
import { roundTwoValue } from '../data/givini';

const onFinish = async ({
  setResult,
  runInWoker,
  setError,
  firstRoundResult,
  values,
}) => {
  const { finalStandings: initialStandings, misc } = firstRoundResult;

  const { merchantSolution2 } = values;
  const decisions = { merchantSolution2 };

  const nonInvestmentChanges = {
    money: 0,
    profits: 0,
    social: 0,
    givini: 0,
    list: [],
  };

  const giviniStart = initialStandings.givini;
  const giviniExtra = roundTwoValue(decisions);

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
        onFinish={(values) => {
          onFinish({
            setResult,
            runInWoker,
            setError,
            firstRoundResult,
            values,
          });
        }}
        loading={loading}
        firstRoundDecisions={firstRoundResult.decisions}
      />
      {result && <Result {...result} />}
    </>
  );
};

export default FirstRound;
