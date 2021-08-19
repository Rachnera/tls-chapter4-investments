import { useState } from 'react';
import Form from './Form';
import Result from '../results';
import Failure from '../Failure';
import {
  baseValue as giviniBaseValue,
  roundOneChanges as givinieRoundOneChanges,
} from '../givini';

const onFinish = async ({ values, setResult, runInWoker, setError }) => {
  setError(undefined);

  const {
    previous = [],
    remainingPron,
    baseProfit,
    strategy,
    startingSocial,
    ...misc
  } = values;

  const giviniStart = giviniBaseValue({ chapter3Investments: previous });
  const giviniExtra = givinieRoundOneChanges();

  const initialStandings = {
    givini: giviniStart,
    social: startingSocial,
    money: remainingPron + baseProfit,
    profits: baseProfit,
    previousInvestments: previous,
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

  if (!result) {
    setResult(undefined);
    setError(
      `Couldn't find a working combination of investments for that strategy with these starting values, sorry.`
    );
    return;
  }

  setResult({
    initialStandings,
    nonInvestmentChanges,
    investmentChanges: result,
  });
};

const FirstRound = ({ runInWoker, loading }) => {
  const [result, setResult] = useState();
  const [error, setError] = useState();

  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish({ values, setResult, runInWoker, setError });
        }}
        loading={loading}
      />
      {error && <Failure message={error} />}
      {result && <Result {...result} />}
    </>
  );
};

export default FirstRound;
