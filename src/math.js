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

import allInvestments from './investments';

const specialInvestments = allInvestments.filter(
  ({ profits }) => typeof profits === 'function'
);

export const combinations = (investments, maxPrice) => {
  if (investments.length === 0) {
    return [[]];
  }

  const sortedInvestments = [...investments].sort(
    ({ price: a = 0 }, { price: b = 0 }) => {
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        return 0;
      }
      return b - a;
    }
  );

  let bigger = {};
  for (let i = 0; i < sortedInvestments.length; i++) {
    bigger[sortedInvestments[i]['name']] = sortedInvestments.slice(i + 1);
  }

  let resultPerSize = [];
  resultPerSize[0] = [[]];

  resultPerSize[1] = sortedInvestments.map((investment) => [investment]);

  for (let s = 2; s <= investments.length; s++) {
    resultPerSize[s] = [];

    const previous = resultPerSize[s - 1];
    previous.forEach((partialList) => {
      const last = partialList[partialList.length - 1];
      bigger[last.name].forEach((investment) => {
        const candidate = [...partialList, investment];

        if (
          maxPrice &&
          candidate.reduce((acc, { price = 0 }) => {
            return acc + (Number.isInteger(price) ? price : 0);
          }, 0) > maxPrice
        ) {
          return;
        }

        resultPerSize[s].push([...partialList, investment]);
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
  const updatedContext = {
    ...context,
    investments,
  };

  const computedInvestments = investments.map((investment) =>
    compute(investment, updatedContext)
  );

  const profits =
    sum(computedInvestments, 'profits') +
    specialInvestments.reduce((acc, specialInv) => {
      if (context?.previousInvestments?.includes(specialInv.name)) {
        return (
          acc +
          specialInv.profits(updatedContext) -
          specialInv.profits({ ...updatedContext, investments: [] })
        );
      }

      return acc;
    }, 0);

  return {
    price: sum(computedInvestments, 'price'),
    profits,
    social: sum(computedInvestments, 'social'),
    givini: sum(computedInvestments, 'givini'),
    investments: computedInvestments,
  };
};

export const best = ({ money, investments, context = {}, social = 0 }) => {
  let result = {
    price: 0,
    profits: 0,
    social: 0,
    givini: 0,
    investments: [],
  };

  combinations(investments, money).forEach((comb) => {
    const candidate = combine(comb, context);
    if (candidate.price <= money && candidate.social >= social) {
      if (
        candidate.profits > result.profits ||
        (candidate.profits === result.profits && candidate.price < result.price)
      ) {
        result = candidate;
      }
    }
  });

  return result;
};

export const finest = ({
  money,
  previousInvestments = [],
  social = 0,
  ...misc
}) => {
  return best({
    money,
    social,
    investments: allInvestments.filter(
      ({ name }) => !previousInvestments.includes(name)
    ),
    context: {
      ...misc,
      previousInvestments,
    },
  });
};
