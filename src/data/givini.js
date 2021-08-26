const sum = (list) =>
  list.reduce(
    (acc, { values }) => acc + values.reduce((acc, value) => acc + value, 0),
    0
  );

export const startingValue = -5;

export const preliminaryChanges = ({ investments }) => {
  return [
    { label: `Petitions`, values: [5, 5, 2, 2, 2] },
    {
      label: `New Givini Trade`,
      values: [5, 1],
      explanation: `+5 when bought, +1 at the start of the round`,
    },
    investments.includes("Min's Trade Route") && {
      label: `Min's Trade Route`,
      values: [1],
    },
  ].filter(Boolean);
};

export const baseValue = ({ chapter3Investments }) =>
  startingValue + sum(preliminaryChanges({ investments: chapter3Investments }));

export const roundOneChanges = ({ merchantSolution, magicalItems }) => {
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
    {
      label: `New Givini Trade`,
      values: [1],
      explanation: `+1 at the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ].filter(Boolean);
};

export const roundOneValue = (...params) => sum(roundOneChanges(...params));

export const roundTwoChanges = ({ merchantSolution2 }) => {
  return [
    merchantSolution2 === 'neutral' && {
      label: `Merchant dispute: Neutral compromise`,
      values: [1],
    },
    merchantSolution2 === 'givini' && {
      label: `Merchant dispute: Favor New Givini`,
      values: [2],
    },
    {
      label: `New Givini Trade`,
      values: [1],
      explanation: `+1 at the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ].filter(Boolean);
};

export const roundTwoValue = (...params) => sum(roundTwoChanges(...params));
