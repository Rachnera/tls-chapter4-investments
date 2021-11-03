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
      values: [5],
      explanation: `On purchase`,
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
      explanation: `At the end of the round`,
    },
    research === 'orc' && {
      label: `Research: Orc Diversification`,
      values: [5],
    },
  ].filter(Boolean);
};

export const roundOneValue = (...params) => sum(roundOneChanges(...params));

export const roundTwoChanges = ({ research }) => {
  return [
    {
      label: `Tak'Kan Trade`,
      values: [1],
      explanation: `At the end of the round`,
    },
    research === 'orc' && {
      label: `Research: Orc Diversification`,
      values: [5],
    },
  ].filter(Boolean);
};

export const roundTwoValue = (...params) => sum(roundTwoChanges(...params));

export const council = ({ investments = [], takkan, researches = [] }) => {
  let yes = 3 + 1 + 1; //Base, Elleani, Impaler
  let no = 2;

  if (takkan >= 40) {
    yes += 4;
  } else if (takkan >= 30) {
    yes += 3;
    no += 1;
  } else if (takkan >= 20) {
    yes += 2;
    no += 2;
  } else if (takkan >= 10) {
    yes += 1;
    no += 3;
  } else {
    no += 4;
  }

  if (researches.includes('orc')) {
    yes += 1;
  } else {
    no += 1;
  }

  yes += investments.filter((name) => {
    return [
      'Orc Pools Upgrade',
      "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
      'Hall of Mental Strength',
      'Imp Offices',
    ].includes(name);
  }).length;

  if (investments.includes('Orcish Democracy')) {
    yes = +2;
  }

  return yes / (yes + no);
};

export const roundThreeChanges = ({
  research,
  gawnfallMercantile,
  gawnfallTakkan,
}) => {
  return [
    gawnfallTakkan === 'minor' && {
      label: `Tak'Kan vote`,
      values: [2],
    },
    gawnfallTakkan === 'major' && {
      label: `Tak'Kan vote`,
      values: [5],
    },
    ['excellent', 'good'].includes(gawnfallMercantile) && {
      label: `Mercantile solution`,
      values: [1],
    },
    {
      label: `Tak'Kan Trade`,
      values: [1],
      explanation: `At the end of the round`,
    },
    research === 'orc' && {
      label: `Research: Orc Diversification`,
      values: [5],
    },
  ].filter(Boolean);
};

export const roundThreeValue = (...params) => sum(roundThreeChanges(...params));
