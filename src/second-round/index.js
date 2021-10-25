import Form from './Form';
import { buildFinalStandings } from '../misc';
import Result from './results';
import { roundTwoValue as giviniRoundTwoValue } from '../data/givini';
import { price as headquartersPrice } from './Headquarters';
import { roundTwoValue as takkanRoundTwoValue } from '../data/takkan';
import { Typography } from 'antd';
import { useEffect, useRef } from 'react';

const { Title } = Typography;

const socialRequirement = (initialSocial, decisions) => {
  if (decisions.merchantSolution2 === 'neutral' && initialSocial < 40) {
    return 40 - initialSocial;
  }

  return 0;
};

const onFinish = async ({
  setResult,
  runInWoker,
  setError,
  firstRoundResult,
  values,
}) => {
  const { finalStandings: initialStandings, misc } = firstRoundResult;

  const {
    merchantSolution2,
    headquarters,
    orcCouncil,
    mandatory,
    banned,
    research,
  } = values;
  const decisions = { merchantSolution2, headquarters, orcCouncil, research };

  const headquartersUpgradesPrice = headquartersPrice({
    research: firstRoundResult.decisions.research,
    extra: decisions.headquarters === 'extra',
  });

  const nonInvestmentChanges = {
    money: -headquartersUpgradesPrice,
    profits: 0,
    social: 0,
    givini: giviniRoundTwoValue(decisions),
    takkan: takkanRoundTwoValue(decisions),
    list: [
      {
        name: `Headquarters upgrades`,
        price: -headquartersUpgradesPrice,
      },
    ],
  };

  const params = {
    ...misc,
    previousInvestments: initialStandings.investments,
    money:
      initialStandings.money +
      initialStandings.profits -
      headquartersUpgradesPrice,
    giviniStart: initialStandings.givini,
    giviniExtra: nonInvestmentChanges.givini,
    takkan: initialStandings.takkan,
    completedResearch: [firstRoundResult.decisions.research],
    otherRequirements: {
      social: socialRequirement(initialStandings.social, decisions),
      orcCouncil: decisions.orcCouncil,
      mandatory,
      banned,
    },
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

const SecondRound = ({
  runInWoker,
  loading,
  result,
  setResult,
  setError,
  firstRoundResult,
}) => {
  const resultRef = useRef(null);
  useEffect(() => {
    if (!result || !resultRef.current) {
      return;
    }
    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [result, resultRef]);

  return (
    <div className="round-two">
      <Title level={2}>{`Chapter 4 – Round 2`}</Title>
      <Form
        onFinish={(values) => {
          onFinish({
            setResult,
            runInWoker,
            setError,
            firstRoundResult,
            values,
          });
        }}
        loading={loading}
        firstRoundDecisions={firstRoundResult.decisions}
        purchasedInvestments={firstRoundResult.finalStandings.investments}
      />
      {result && (
        <div ref={resultRef}>
          <Result roundOneDecisions={firstRoundResult.decisions} {...result} />
        </div>
      )}
    </div>
  );
};

export default SecondRound;
