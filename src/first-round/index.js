import { useState } from 'react';
import Form from './Form';
import Result from './Result';

const onFinish = async ({ values, setResult, runInWoker }) => {
  const {
    previous = [],
    remainingPron,
    baseProfit,
    strategy,
    startingSocial,
    ...misc
  } = values;

  const giviniStart = 17 + previous.includes("Min's Trade Route");
  const giviniExtra = 6; // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social

  const initialStandings = {
    givini: giviniStart,
    social: startingSocial,
    money: remainingPron + baseProfit,
    profits: baseProfit,
  };

  const nonInvestmentChanges = {
    givini: giviniExtra,
    social: 0,
    money: 0,
    profits: 0,
  };

  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social: strategy === 'social' ? 40 - startingSocial : 0,
    giviniStart,
    giviniExtra,
    ...misc,
  };

  const result = await runInWoker(params);

  setResult({
    initialStandings,
    nonInvestmentChanges,
    investmentChanges: {
      givini: result.investments.reduce(
        (acc, { givini = 0 }) => acc + givini,
        0
      ),
      ...result,
    },
  });
};

const FirstRound = ({ runInWoker, loading }) => {
  const [result, setResult] = useState();

  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish({ values, setResult, runInWoker });
        }}
        loading={loading}
      />
      {result && <Result {...result} />}
    </>
  );
};

export default FirstRound;
