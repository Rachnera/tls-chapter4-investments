const sum = (list) =>
  list.reduce(
    (acc, { values }) => acc + values.reduce((acc, value) => acc + value, 0),
    0
  );

export const startingValue = -5;

export const preliminaryChanges = () => {
  return [
    { label: `Petitions`, values: [5, 2, 2, 5] },
    {
      label: `Tak'Kan Trade`,
      values: [5, 1],
      explanation: `+5 when bought, +1 at the start of the round`,
    },
  ];
};

export const baseValue = () => startingValue + sum(preliminaryChanges());

export const roundOneChanges = ({ magicalItems, research }) => {
  return [
    magicalItems === 'takkan' && {
      label: `House Rose's magical items: Tak'Kan`,
      values: [2],
    },
    {
      label: `Tak'Kan Trade`,
      values: [1],
      explanation: `+1 at the end of the round`,
    },
    research === 'orc' && {
      label: `Research: Orc Diversification`,
      values: [5],
    },
  ].filter(Boolean);
};

export const roundOneValue = (...params) => sum(roundOneChanges(...params));

export const roundTwoChanges = () => {
  return [
    {
      label: `Tak'Kan Trade`,
      values: [1],
      explanation: `+1 at the end of the round`,
    },
  ];
};

export const roundTwoValue = () => 1;

