import Form from './Form';
import Result from './results';
import {
  baseValue as giviniBaseValue,
  roundOneValue as giviniRoundOneValue,
} from '../data/givini';
import { buildFinalStandings } from '../misc';
import {
  baseValue as takkanBaseValue,
  roundOneValue as takkanRoundOneValue,
} from '../data/takkan';
import ScrollTo from '../results/ScrollTo';

const socialRequirement = (
  startingSocial,
  { strategy, jhenno, merchantSolution }
) => {
  if (strategy === 'money') {
    return 0;
  }
  if (merchantSolution === 'neutral') {
    return 40 - startingSocial;
  }
  const base = strategy === 'compromise' ? 30 : 40;
  const jhennoModifier = jhenno === 'politics' ? 1 : 0;
  return base - (startingSocial + jhennoModifier);
};

const giviniRequirement = ({ giviniStart, giviniExtra }) => {
  const absoluteRequirement = 25;
  const offset = 3; // Points earned after the requirement matters

  return absoluteRequirement - giviniStart - giviniExtra + offset;
};

const buildNonInvestmentsChange = ({ decisions, spending }) => {
  const { jhenno } = decisions;

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
    !!spending && {
      name: `Other spending`,
      money: -spending,
    },
  ].filter(Boolean);

  return {
    givini: giviniRoundOneValue(decisions),
    takkan: takkanRoundOneValue(decisions),
    money: nonInvestmentChangesList.reduce(
      (acc, { money = 0 }) => acc + money,
      0
    ),
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
};

const compute = async ({
  runInWoker,
  initialStandings,
  decisions,
  nonInvestmentChanges,
  mandatory,
  misc,
  banned,
}) => {
  const giviniStart = initialStandings.givini;
  const giviniExtra = nonInvestmentChanges.givini;

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits +
      nonInvestmentChanges.money,
    otherRequirements: {
      social: socialRequirement(initialStandings.social, decisions),
      givini: giviniRequirement({
        giviniStart,
        giviniExtra,
      }),
      mandatory,
      atLeastOne:
        decisions.strategy === 'succession'
          ? ['War Monument', 'Givini Mage Guild']
          : undefined,
      banned,
    },
    giviniStart,
    giviniExtra,
  };

  return runInWoker(params);
};

const onFinish = async ({ values, setResult, runInWoker, setError }) => {
  setError(undefined);

  const {
    previous = [],
    remainingPron,
    baseProfit,
    startingSocial,

    strategy,
    merchantSolution,
    jhenno,
    magicalItems,
    research,

    mandatory,
    banned,
    spending,

    chapter1Steel,
    chapter3Infrastructure,
  } = values;

  const initialStandings = {
    money: remainingPron,
    profits: baseProfit,
    investments: previous,
    social: startingSocial,
    givini: giviniBaseValue({ chapter3Investments: previous }),
    takkan: takkanBaseValue(),
  };

  const decisions = {
    strategy,
    merchantSolution,
    magicalItems,
    research,
    jhenno,
  };

  const misc = {
    chapter1Steel,
    chapter3Infrastructure,
  };

  const nonInvestmentChanges = buildNonInvestmentsChange({
    decisions,
    spending,
  });

  const result = await compute({
    runInWoker,
    initialStandings,
    decisions,
    nonInvestmentChanges,
    mandatory,
    misc,
    banned,
  });

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
  setError(undefined);
};

const FirstRound = ({ runInWoker, loading, result, setResult, setError }) => {
  return (
    <div className="round-one">
      <Form
        onFinish={(values) => {
          onFinish({ values, setResult, runInWoker, setError });
        }}
        loading={loading}
      />
      <ScrollTo data={result}>
        <Result {...result} />
      </ScrollTo>
    </div>
  );
};

export default FirstRound;
