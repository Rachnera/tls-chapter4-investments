import Form from './Form';
import { Typography } from 'antd';
import { buildFinalStandings } from '../misc';
import Result from './Result';
import ScrollTo from '../results/ScrollTo';
import { roundThreeValue as giviniRoundThreeValue } from '../data/givini';
import { roundThreeValue as takkanRoundThreeValue } from '../data/takkan';
import investmentsList from '../data/investments';
import { roundThreeValue as chaliceRoundThreeValue } from '../data/chalice';

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

const ardfordOpen = (decisions) =>
  ['resolved', 'overkill'].includes(decisions.gawnfallArdford);

const preInvestmentsOrii = ({ decisions, initialStandings }) => {
  return (
    ardfordOpen(decisions) &&
    initialStandings.investments.includes('Ardford Restaurant') &&
    initialStandings.investments.includes('Givini Teahouse Chain')
  );
};

const preInvestmentsTradesmasher = ({ decisions, initialStandings }) => {
  return (
    initialStandings.investments.includes("Tradesmasher's Guild") &&
    decisions.gawnfallTakkan === 'major'
  );
};

const pastInvestmentsUpdate = ({
  decisions,
  initialStandings,
  investmentChanges,
}) => {
  let total = 0;
  if (preInvestmentsOrii({ decisions, initialStandings })) {
    total += 15000;
  }
  if (preInvestmentsTradesmasher({ decisions, initialStandings })) {
    const tradesmasherProfits = investmentsList.find(
      ({ name }) => name === "Tradesmasher's Guild"
    ).profits;
    total +=
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

  return total;
};

const projectedPastInvestmentsUpdate = ({ decisions, initialStandings }) => {
  let total = 0;

  if (preInvestmentsOrii({ decisions, initialStandings })) {
    total += 15000;
  }

  if (preInvestmentsTradesmasher({ decisions, initialStandings })) {
    // Could _technically_ be 50000
    // In which case the optimization algorithm would also underestimate the importance of Tradesmasher-related investments for this iteration
    // But that would require not having (at least) the Givini Orc Merchant and Lonely Sailor Services at this point
    // So so unlikely I'm shrugging it off
    total += 25000;
  }

  return total;
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
    spending,
  } = values;
  const decisions = {
    research,
    gawnfallTakkan,
    gawnfallMercantile,
    gawnfallArdford,
    gawnfallMother,
    merchantSolution3,
    gawnfallHigh,
    lustlordStatuesBought: yelarel === 'min',
  };

  const earlyArchives = mandatory1.includes('Denmiel Archives');
  const earlyHousing = mandatory1.includes(
    "Tarran'Kan Housing + Tarran'Kan Trade Upgrade"
  );
  let mandatory = [
    ...mandatory1.filter(
      (name) =>
        ![
          'Denmiel Archives',
          "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
        ].includes(name)
    ),
    ...mandatory2,
  ];
  if (yelarel === 'max') {
    mandatory.push('Lustlord Temples');
  }

  const misc = {
    ...secondRoundResult.misc,
    gawnfallTakkan,
    gawnfallMother,
    gawnfallArdford,
    lustlordStatuesBought: decisions.lustlordStatuesBought,
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
    !!spending && {
      name: `Other spending`,
      money: -spending,
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
    givini: giviniRoundThreeValue(decisions, initialStandings.investments),
    takkan: takkanRoundThreeValue(decisions, initialStandings.investments),
    chalice: chaliceRoundThreeValue(decisions, initialStandings.investments),
    list: nonInvestmentChangesList,
  };

  let reserve = reserves + extra_reserves - initialStandings.profits;
  reserve -= mercantileMoney;
  reserve -= projectedPastInvestmentsUpdate({ decisions, initialStandings });
  if (earlyArchives) {
    reserve -= 20000;
  }
  if (earlyHousing) {
    reserve -= 100000;
  }

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits +
      (nonInvestmentChanges.money - mercantileMoney) -
      (earlyArchives ? 250000 : 0) -
      (earlyHousing ? 1000000 + 100000 : 0),
    giviniStart: initialStandings.givini,
    giviniExtra: nonInvestmentChanges.givini,
    otherRequirements: {
      mandatory,
      banned: [
        ...banned,
        earlyArchives && 'Denmiel Archives',
        earlyHousing && "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
      ].filter(Boolean),
      social:
        decisions.merchantSolution3 === 'neutral'
          ? Math.max(40 - initialStandings.social, 0)
          : 0,
      reserve,
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

  investmentChanges.profits += pastInvestmentsUpdate({
    decisions,
    initialStandings,
    investmentChanges,
  });

  if (earlyArchives) {
    investmentChanges.price += 250000;
    investmentChanges.money -= 250000;
    investmentChanges.profits += 20000;
    investmentChanges.social += 1;
    investmentChanges.investments.push({
      name: 'Denmiel Archives',
      price: 250000,
      profits: 20000,
      social: 1,
    });
  }
  if (earlyHousing) {
    investmentChanges.price += 1000000 + 100000;
    investmentChanges.money -= 1000000 + 100000;
    investmentChanges.profits += 50000 + 50000;
    investmentChanges.social += 1;
    investmentChanges.investments.push({
      name: "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
      price: 1000000 + 100000,
      profits: 50000 + 50000,
      social: 1,
      takkan: 5 + 2,
    });
  }

  // Orri's Social
  const allInvestments = [
    ...initialStandings.investments,
    ...investmentChanges.investments.map(({ name }) => name),
  ];
  if (
    preInvestmentsOrii({ decisions, initialStandings }) ||
    // TODO Find a clean way to update this on each following iteration
    (ardfordOpen(decisions) &&
      allInvestments.includes('Ardford Restaurant') &&
      allInvestments.includes('Givini Teahouse Chain'))
  ) {
    nonInvestmentChanges.list.push({
      name: `Orri's Quest`,
      social: 1,
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
