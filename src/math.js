/**
 * Assumptions:
 * - New Givini Trade bought
 * - Good enough save to achieve minimal price tag on succubus investments (Armor, Tower)
 * - Tradesmasher met during chapter 3
 *
 * Extra New Givini points:
 * - +1 each phase from New Givini Trade
 * - +1 from informing Givino Vinai equipment shop girl of succubus floor of teahouse
 * - +2 for choosing New Givini in the merchants dispute OR +1 if choosing a neutral compromise
 * - +2 for choosing New Givini as the recipient of the magical items requisitioned in Lady Entila's warehouse
 * - +1 for speaking with the king in the ball during the Ardan succession crisis
 *
 * Work hypothesis: +6 for first phase, +1 for second
 */

/**
 * Lexicographic method
 *
 * a    ab    abc
 *            abd
 *      ac    acd
 *      ad
 * b    bc    bcd
 * b    bd
 * c    cd
 * d
 */
export const combinations = (investments) => {
  if (investments.length === 0) {
    return [[]];
  }

  const sortedInvestments = [...investments].sort(({ name: a }, { name: b }) =>
    a.localeCompare(b)
  );

  let resultPerSize = [];
  resultPerSize[0] = [[]];

  resultPerSize[1] = sortedInvestments.map((investment) => [investment]);

  for (let s = 2; s <= investments.length; s++) {
    resultPerSize[s] = [];

    const previous = resultPerSize[s - 1];
    previous.forEach((partialList) => {
      const last = partialList[partialList.length - 1];
      // FIXME Looping on full list then filtering is likely not the most optimized way
      sortedInvestments.forEach((investment) => {
        if (investment.name.localeCompare(last.name) > 0) {
          resultPerSize[s].push([...partialList, investment]);
        }
      });
    });
  }

  return resultPerSize.flat(1);
};

const comp = (value, context) => {
  if (typeof value === 'function') {
    return value(context);
  }
  return value || 0;
};

const sum = (list, key) => list.reduce((acc, obj) => acc + (obj[key] || 0), 0);

const compute = (investment, context) => {
  const { price, profits } = investment;

  return {
    ...investment,
    price: comp(price, context),
    profits: comp(profits, context),
  };
};

export const combine = (investments, context = {}) => {
  const computedInvestments = investments.map((investment) =>
    compute(investment, {
      previousInvestments: context.previousInvestments,
      baseStats: context.baseStats,
      additionalStats: context.additionalStats,
      investments,
    })
  );

  return {
    price: sum(computedInvestments, 'price'),
    profits: sum(computedInvestments, 'profits'),
    social: sum(computedInvestments, 'social'),
    givini: sum(computedInvestments, 'givini'),
    investments: computedInvestments,
  };
};
