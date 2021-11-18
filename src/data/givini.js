const sum = (list) =>
  list.reduce(
    (acc, { values }) => acc + values.reduce((acc, value) => acc + value, 0),
    0
  );

export const startingValue = -5;

export const preliminaryChanges = ({ investments }) => {
  return [
    { label: `Petitions`, values: [5, 5, 2, 2, 2] },
    investments.includes('New Givini Trade') && {
      label: `New Givini Trade`,
      values: [5],
      explanation: `On purchase`,
    },
    investments.includes("Min's Trade Route") && {
      label: `Min's Trade Route`,
      values: [1],
    },
  ].filter(Boolean);
};

export const baseValue = ({ chapter3Investments }) =>
  startingValue + sum(preliminaryChanges({ investments: chapter3Investments }));

export const roundOneChanges = (
  { merchantSolution, magicalItems },
  previousInvestments
) => {
  return [
    magicalItems === 'givini' && {
      label: `House Rose's magical items: Givini`,
      values: [2],
    },
    merchantSolution === 'neutral' && {
      label: `Merchant dispute: Neutral compromise`,
      values: [1],
    },
    merchantSolution === 'givini' && {
      label: `Merchant dispute: Favor New Givini`,
      values: [2],
    },
    { label: `Givino Vinai equipment shop girl`, values: [1] },
    { label: `Givini king`, values: [1] },
    previousInvestments.includes('New Givini Trade') && {
      label: `New Givini Trade`,
      values: [1],
      explanation: `At the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ].filter(Boolean);
};

export const roundOneValue = (...params) => sum(roundOneChanges(...params));

export const roundTwoChanges = ({ merchantSolution2 }, previousInvestments) => {
  return [
    merchantSolution2 === 'neutral' && {
      label: `Merchant dispute: Neutral compromise`,
      values: [1],
    },
    merchantSolution2 === 'givini' && {
      label: `Merchant dispute: Favor New Givini`,
      values: [2],
    },
    previousInvestments.includes('New Givini Trade') && {
      label: `New Givini Trade`,
      values: [1],
      explanation: `At the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ].filter(Boolean);
};

export const roundTwoValue = (...params) => sum(roundTwoChanges(...params));

export const roundThreeChanges = (
  { merchantSolution3, gawnfallTakkan, gawnfallMercantile },
  previousInvestments
) => {
  return [
    merchantSolution3 === 'neutral' && {
      label: `Merchant dispute: Neutral compromise`,
      values: [1],
    },
    merchantSolution3 === 'givini' && {
      label: `Merchant dispute: Favor New Givini`,
      values: [2],
    },
    gawnfallTakkan === 'major' && {
      label: `Gawnfall: Tak'Kan vote`,
      values: [1],
    },
    ['excellent', 'good'].includes(gawnfallMercantile) && {
      label: `Gawnfall: Mercantile solution`,
      values: [1],
    },
    previousInvestments.includes('New Givini Trade') && {
      label: `New Givini Trade`,
      values: [1],
      explanation: `At the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ].filter(Boolean);
};

export const roundThreeValue = (...params) => sum(roundThreeChanges(...params));
