/**
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
            return acc + price;
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

export const combine = (investments, context = {}) => {
  const updatedContext = {
    ...context,
    investments,
  };

  let price = 0;
  let profits = 0;
  let social = 0;
  let computedInvestments = [];

  investments.forEach((investment) => {
    const invProfits = comp(investment.profits, updatedContext);

    price += investment.price;
    profits += invProfits;
    social += investment.social || 0;
    computedInvestments.push({
      ...investment,
      profits: invProfits,
    });
  });

  specialInvestments.forEach((specialInv) => {
    if (context?.previousInvestments?.includes(specialInv.name)) {
      profits +=
        specialInv.profits(updatedContext) -
        specialInv.profits({ ...updatedContext, investments: [] });
    }
  });

  return {
    price,
    profits,
    social,
    investments: computedInvestments,
  };
};

export const isBetter = ({ current, candidate, money, social }) => {
  if (candidate.price > money || candidate.social < social) {
    return false;
  }

  return (
    candidate.profits > current.profits ||
    (candidate.profits === current.profits && candidate.price < current.price)
  );
};

export const best = ({ money, investments, context = {}, social = 0 }) => {
  let result = {
    price: 0,
    profits: 0,
    social: 0,
    investments: [],
  };

  combinations(investments, money).forEach((comb) => {
    const candidate = combine(comb, context);
    if (isBetter({ current: result, candidate, money, social })) {
      result = candidate;
    }
  });

  return result;
};

export const buildParams = ({
  money,
  previousInvestments = [],
  social = 0,
  ...misc
}) => {
  const context = {
    ...misc,
    previousInvestments,
  };

  return {
    money,
    social,
    investments: allInvestments
      .filter(({ name }) => !previousInvestments.includes(name))
      .map((investment) => {
        return {
          ...investment,
          price: comp(investment.price, context),
        };
      }),
    context,
  };
};

export const finest = (params) => {
  return best(buildParams(params));
};
