import Form from './Form';
import { Typography } from 'antd';
import { buildFinalStandings } from '../misc';
import Result from './Result';
import ScrollTo from '../results/ScrollTo';
import { roundThreeValue as giviniRoundThreeValue } from '../data/givini';
import { roundThreeValue as takkanRoundThreeValue } from '../data/takkan';
import investmentsList from '../data/investments';

const { Title } = Typography;

const gawnfallSocial = ({ gawnfallMother, gawnfallHigh }) => {
  let social = 0;

  if (gawnfallMother === 'full_unlock') {
    social += 2;
  }
  if (gawnfallMother === 'partial_unlock') {
    social += 1;
  }
  if (gawnfallHigh === 'herin_overwhelming') {
    social += 1;
  }
  if (gawnfallHigh === 'kaskia_overwhelming') {
    social -= 1;
  }

  return social;
};

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
    mandatory: mandatory2,
    banned,
    gawnfallHigh,
    reserves,
    extra_reserves,
  } = values;
  const decisions = {
    research,
    gawnfallTakkan,
    gawnfallMercantile,
    gawnfallArdford,
    gawnfallMother,
    merchantSolution3,
    gawnfallHigh,
  };
  let mandatory = [...mandatory1, ...mandatory2];
  if (yelarel === 'max') {
    mandatory.push('Lustlord Temples');
  }

  const misc = {
    ...secondRoundResult.misc,
    gawnfallTakkan,
    gawnfallMother,
    gawnfallArdford,
    lustlordStatuesBought: yelarel === 'min',
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
    yelarel === 'min' && {
      name: `New Lustlord Statues`,
      money: -50000,
    },
    vera && {
      name: `Goddess of Magic Statue`,
      money: -10000,
    },
    {
      name: `Gawnfall social influence`,
      social: gawnfallSocial(decisions),
    },
    {
      name: `One-time mercantile issue modifier`,
      money: mercantileMoney,
    },
  ].filter(Boolean);

  const nonInvestmentChanges = {
    money: nonInvestmentChangesList.reduce(
      (acc, { money }) => acc + (money || 0),
      0
    ),
    profits: 0,
    social: nonInvestmentChangesList.reduce(
      (acc, { social }) => acc + (social || 0),
      0
    ),
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
      (nonInvestmentChanges.money - mercantileMoney),
    giviniStart: initialStandings.givini,
    giviniExtra: nonInvestmentChanges.givini,
    otherRequirements: {
      mandatory,
      banned,
      social:
        decisions.merchantSolution3 === 'neutral'
          ? Math.max(40 - initialStandings.social, 0)
          : 0,
      reserve:
        reserves +
        extra_reserves -
        (initialStandings.profits + nonInvestmentChanges.profits),
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

  // Chaotic fixes for Ardford Restaurant/Tradesmasher's Guild profits
  const ardfordOpen = ['resolved', 'overkill'].includes(
    decisions.gawnfallArdford
  );
  const preInvestmentsOrii =
    ardfordOpen &&
    initialStandings.investments.includes('Ardford Restaurant') &&
    initialStandings.investments.includes('Givini Teahouse Chain');
  const allInvestments = [
    ...initialStandings.investments,
    ...investmentChanges.investments.map(({ name }) => name),
  ];
  const postInvestmentsOrri =
    !preInvestmentsOrii &&
    ardfordOpen &&
    allInvestments.includes('Ardford Restaurant') &&
    allInvestments.includes('Givini Teahouse Chain');

  if (preInvestmentsOrii || postInvestmentsOrri) {
    nonInvestmentChanges.list.push({
      name: `Orri's Quest`,
      social: 1,
    });
  }
  if (preInvestmentsOrii) {
    investmentChanges.profits += 15000;
  }
  if (
    initialStandings.investments.includes("Tradesmasher's Guild") &&
    decisions.gawnfallTakkan === 'major'
  ) {
    const tradesmasherProfits = investmentsList.find(
      ({ name }) => name === "Tradesmasher's Guild"
    ).profits;
    investmentChanges.profits +=
      tradesmasherProfits({
        investments: investmentChanges.investments,
        previousInvestments: initialStandings.investments,
        gawnfallTakkan: 'major',
      }) -
      tradesmasherProfits({
        investments: investmentChanges.investments,
        previousInvestments: initialStandings.investments,
      });
  }

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
