import Form from './Form';
import Result from '../results';
import {
  baseValue as giviniBaseValue,
  roundOneValue as giviniRoundOneValue,
} from '../data/givini';

const socialRequirement = ({
  strategy,
  startingSocial,
  jhenno,
  merchantSolution,
}) => {
  if (strategy === 'money') {
    return 0;
  }
  if (jhenno === 'politics' && merchantSolution !== 'neutral') {
    return 39 - startingSocial;
  }
  return 40 - startingSocial;
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
    merchantSolution,
    jhenno,
    magicalItems,
    mandatory,
    research,
    ...misc
  } = values;

  const decisions = { strategy, merchantSolution, magicalItems, research };

  const giviniStart = giviniBaseValue({ chapter3Investments: previous });
  const giviniExtra = giviniRoundOneValue(decisions);

  const initialStandings = {
    givini: giviniStart,
    social: startingSocial,
    money: remainingPron + baseProfit,
    profits: baseProfit,
    previousInvestments: previous,
  };

  const nonInvestmentChangesList = [
    jhenno === 'politics' && {
      name: `Jhenno's political cooperation`,
      social: 1,
    },
    {
      name: `Succession crisis' reward (best result)`,
      social: 3,
    },
    {
      name: `The Three Trades become less profitable`,
      profits: -300000,
    },
  ].filter(Boolean);

  const nonInvestmentChanges = {
    givini: giviniExtra,
    money: 0,
    profits: nonInvestmentChangesList.reduce(
      (acc, { profits = 0 }) => acc + profits,
      0
    ),
    social: nonInvestmentChangesList.reduce(
      (acc, { social = 0 }) => acc + social,
      0
    ),
    list: nonInvestmentChangesList,
  };

  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    otherRequirements: {
      social: socialRequirement({
        startingSocial,
        strategy,
        jhenno,
        merchantSolution,
      }),
      givini: giviniRequirement({ giviniStart, giviniExtra }),
      mandatory,
      atLeastOne:
        strategy === 'succession'
          ? ['War Monument', 'Givini Mage Guild']
          : undefined,
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
    decisions,
  });
};

const FirstRound = ({ runInWoker, loading, result, setResult, setError }) => {
  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish({ values, setResult, runInWoker, setError });
        }}
        loading={loading}
      />
      {result && <Result {...result} />}
    </>
  );
};

export default FirstRound;
