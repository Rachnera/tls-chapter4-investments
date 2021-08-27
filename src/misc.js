export const buildFinalStandings = ({
  initialStandings,
  investmentChanges,
  nonInvestmentChanges,
}) => {
  let finalStandings = {};

  ['profits', 'givini', 'social', 'takkan'].forEach((key) => {
    finalStandings[key] =
      initialStandings[key] +
      investmentChanges[key] +
      nonInvestmentChanges[key];
  });

  finalStandings['investments'] = [
    ...initialStandings.investments,
    ...investmentChanges.investments.map(({ name }) => name),
  ];

  finalStandings['money'] =
    initialStandings.money +
    initialStandings.profits -
    investmentChanges.price +
    nonInvestmentChanges.money;

  return finalStandings;
};

export const nF = (number) => number.toLocaleString('en-US');
