import { useState } from 'react';
import Form from './Form';
import Result from '../results';
import Failure from '../Failure';
import {
  baseValue as giviniBaseValue,
  roundOneValue as giviniRoundOneValue,
} from '../givini';

const socialRequirement = ({ strategy, startingSocial }) => {
  if (strategy === 'social') {
    return 40 - startingSocial;
  }
  return 0;
};

const giviniRequirement = ({ giviniStart, giviniExtra }) => {
  const absoluteRequirement = 25;
  const offset = 3; // Points earned after the requirement matters

  return absoluteRequirement - giviniStart - giviniExtra + offset;
};

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
  const giviniExtra = giviniRoundOneValue();

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
    otherRequirements: {
      social: socialRequirement({ startingSocial, strategy }),
      givini: giviniRequirement({ giviniStart, giviniExtra }),
    },
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
