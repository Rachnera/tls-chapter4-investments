import { useEffect } from 'react';
import Form from './Form';
import { Typography } from 'antd';
import { buildFinalStandings } from '../misc';

const { Title } = Typography;

const onFinish = async ({
  runInWoker,
  setResult,
  setError,
  secondRoundResult,
  values,
}) => {
  const { finalStandings: initialStandings } = secondRoundResult;

  const { research, mandatory1, yelarel, takkan, mercantile, ardford, mother } =
    values;
  const decisions = {
    research,
    gawnfall: { takkan, mercantile, ardford, mother },
  };
  let mandatory = [...mandatory1];
  if (yelarel === 'max') {
    mandatory.push('Lustlord Temples');
  }

  const misc = {
    ...secondRoundResult.misc,
    gawnfallTakkan: decisions.gawnfall.takkan,
    gawnfallMother: decisions.gawnfall.mother,
    gawnfallArford: decisions.gawnfall.ardford,
  };

  const mercantileMoney = (() => {
    switch (decisions.gawnfall.mercantile) {
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

  const nonInvestmentChanges = {
    money: -50000,
    profits: mercantileMoney,
    social: 0,
    givini: 0,
    takkan: 0,
    list: [
      {
        name: `New Lustlord Statues`,
        price: -50000,
      },
      {
        name: `One-time mercantile issue modifier`,
        profits: mercantileMoney,
      },
    ],
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

  useEffect(() => {
    console.log(result);
  }, [result]);

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
    </div>
  );
};

export default ThirdRound;
