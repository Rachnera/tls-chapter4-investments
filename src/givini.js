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
      explanation: `+5 when bought, +1 at round's start`,
    },
    investments.includes("Min's Trade Route") && {
      label: `Min's Trade Route`,
      values: [1],
    },
  ].filter(Boolean);
};

export const baseValue = ({ chapter3Investments }) =>
  startingValue + sum(preliminaryChanges({ investments: chapter3Investments }));

export const roundOneChanges = () => {
  return [
    { label: `Magical items`, values: [2] },
    { label: `Merchant dispute`, values: [1] },
    {
      label: `Givino Vinai equipment shop girl`,
      values: [1],
      explanation: `Score already ≥ 25`,
    },
    { label: `Givini king`, values: [1], explanation: `Score already ≥ 25` },
    {
      label: `New Givini Trade`,
      values: [1],
      explanation: `+1 at the end of the round (before profits from the Givini Orc Merchant are computed)`,
    },
  ];
};
