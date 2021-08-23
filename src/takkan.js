export const startingValue = -5;

export const preliminaryChanges = () => {
  return [
    { label: `Petitions`, values: [5, 2, 2, 5] },
    {
      label: `Tak'Kan Trade`,
      values: [5, 1],
      explanation: `+5 when bought, +1 at round's start`,
    },
  ];
};

export const roundOneChanges = ({ magicalItems, research }) => {
  return [
    magicalItems === 'takkan' && {
      label: `House Rose's magical items: Tak'Kan`,
      values: [2],
    },
    research === 'orc' && {
      label: `Research: Orc Diversification`,
      values: [5],
    },
    {
      label: `Tak'Kan Trade`,
      values: [1],
      explanation: `+1 at the end of the round`,
    },
  ].filter(Boolean);
};
