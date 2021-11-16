const sum = (list) =>
  list.reduce(
    (acc, { values }) => acc + values.reduce((acc, value) => acc + value, 0),
    0
  );

export const startingValue = 10;

export const preliminaryChanges = ({ initialInvestments }) => {
  return [
    { label: `Petitions`, values: [5, 5, 1, 5, 2, 2] },
    {
      label: `Chalice States Trade`,
      values: [5],
      explanation: `On purchase`,
    },
    initialInvestments.includes("Min's Trade Route") && {
      label: `Min's Trade Route`,
      values: [1],
    },
    initialInvestments.includes('Gasm Falls Shop') && {
      label: `Gasm Falls Shop`,
      values: [2],
    },
    initialInvestments.includes('Yhilini Succubi Trade') && {
      label: `Yhilini Succubi Trade`,
      values: [2],
    },
  ].filter(Boolean);
};

export const baseValue = ({ initialInvestments }) =>
  startingValue + sum(preliminaryChanges({ initialInvestments }));

export const roundOneChanges = ({ magicalItems }) => {
  return [
    magicalItems === 'chalice' && {
      label: `House Rose's magical items: Chalice States`,
      values: [2],
    },
    {
      label: `Chalice States Trade`,
      values: [1],
      explanation: `At the end of the round`,
    },
  ].filter(Boolean);
};

export const roundOneValue = (...params) => sum(roundOneChanges(...params));

export const roundTwoChanges = () => {
  return [
    {
      label: `Chalice States Trade`,
      values: [1],
      explanation: `At the end of the round`,
    },
  ];
};

export const roundTwoValue = (...params) => sum(roundTwoChanges(...params));
