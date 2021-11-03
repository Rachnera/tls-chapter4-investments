import Form from './Form';
import { Typography } from 'antd';
import { buildFinalStandings } from '../misc';
import Result from './Result';
import ScrollTo from '../results/ScrollTo';
import { roundThreeValue as giviniRoundThreeValue } from '../data/givini';
import { roundThreeValue as takkanRoundThreeValue } from '../data/takkan';

const { Title } = Typography;

const onFinish = async ({
  runInWoker,
  setResult,
  setError,
  secondRoundResult,
  values,
}) => {
  const { finalStandings: initialStandings } = secondRoundResult;

  const {
    research,
    mandatory1,
    yelarel,
    gawnfallTakkan,
    gawnfallMercantile,
    gawnfallArdford,
    gawnfallMother,
    vera,
    merchantSolution3,
  } = values;
  const decisions = {
    research,
    gawnfallTakkan,
    gawnfallMercantile,
    gawnfallArdford,
    gawnfallMother,
    merchantSolution3,
  };
  let mandatory = [...mandatory1];
  if (yelarel === 'max') {
    mandatory.push('Lustlord Temples');
  }

  const misc = {
    ...secondRoundResult.misc,
    gawnfallTakkan,
    gawnfallMother,
    gawnfallArdford,
  };

  const mercantileMoney = (() => {
    switch (decisions.gawnfallMercantile) {
      case 'excellent':
        return 250000;
      case 'good':
        return 100000;
      case 'poor':
        return -100000;
      default:
        return 0;
    }
  })();

  const nonInvestmentChangesList = [
    {
      name: `New Lustlord Statues`,
      money: -50000,
    },
    vera && {
      name: `Goddess of Magic Statue`,
      money: -10000,
    },
    {
      name: `One-time mercantile issue modifier`,
      profits: mercantileMoney,
    },
  ].filter(Boolean);

  const nonInvestmentChanges = {
    money: nonInvestmentChangesList.reduce(
      (acc, { money }) => acc + (money || 0),
      0
    ),
    profits: mercantileMoney,
    social: 0,
    givini: giviniRoundThreeValue(decisions),
    takkan: takkanRoundThreeValue(decisions),
    list: nonInvestmentChangesList,
  };

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits +
      nonInvestmentChanges.money,
    giviniStart: initialStandings.givini,
    giviniExtra: nonInvestmentChanges.givini,
    otherRequirements: {
      mandatory,
    },
    list: 'gawnfall',
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
  setError(undefined);
};

const ThirdRound = ({
  firstRoundResult,
  secondRoundResult,
  runInWoker,
  loading,
  setResult,
  setError,
  result,
}) => {
  const previousInvestments = secondRoundResult.finalStandings.investments;
  const previousResearch = [
    firstRoundResult.decisions.research,
    secondRoundResult.decisions.research,
  ];
  const merchantSolution = (() => {
    if (firstRoundResult.decisions.merchantSolution !== 'wait') {
      return firstRoundResult.decisions.merchantSolution;
    }

    if (secondRoundResult.decisions.merchantSolution2 !== 'wait') {
      return secondRoundResult.decisions.merchantSolution2;
    }

    return undefined;
  })();

  return (
    <div className="round-three">
      <Title level={2}>{`Chapter 4 – Round 3`}</Title>
      <Form
        previousInvestments={previousInvestments}
        previousResearch={previousResearch}
        onFinish={(values) => {
          onFinish({
            runInWoker,
            setResult,
            setError,
            secondRoundResult,
            values,
          });
        }}
        loading={loading}
        merchantSolution={merchantSolution}
      />
      <ScrollTo data={result}>
        <Result {...result} />
      </ScrollTo>
    </div>
  );
};

export default ThirdRound;
