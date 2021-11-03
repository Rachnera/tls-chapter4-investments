import Form from './Form';
import { Typography } from 'antd';
import { buildFinalStandings } from '../misc';
import Result from './results';
import ScrollTo from '../results/ScrollTo';

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
  } = values;
  const decisions = {
    research,
    gawnfallTakkan,
    gawnfallMercantile,
    gawnfallArdford,
    gawnfallMother,
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
      price: -50000,
    },
    vera && {
      name: `Goddess of Magic Statue`,
      price: -10000,
    },
    {
      name: `One-time mercantile issue modifier`,
      price: 0,
      profits: mercantileMoney,
    },
  ].filter(Boolean);

  const nonInvestmentChanges = {
    money: nonInvestmentChangesList.reduce((acc, { price }) => acc + price, 0),
    profits: mercantileMoney,
    social: 0,
    givini: 0,
    takkan: 0,
    list: nonInvestmentChangesList,
  };

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits -
      nonInvestmentChanges.money,
    giviniStart: initialStandings.givini,
    giviniExtra: 0,
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
      />
      <ScrollTo data={result}>
        <Result {...result} />
      </ScrollTo>
    </div>
  );
};

export default ThirdRound;
