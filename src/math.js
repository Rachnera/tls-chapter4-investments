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
import { donovanHindered } from './misc';

const specialInvestments = allInvestments.filter(
  ({ profits }) => typeof profits === 'function'
);

export const buildCheaperThan = (investments, mandatory = []) => {
  const sortedInvestments = investments
    .filter(({ name }) => !mandatory.includes(name))
    .sort(({ price: a = 0 }, { price: b = 0 }) => {
      return b - a;
    });

  let cheaperThan = {};
  const init = investments.filter(({ name }) => mandatory.includes(name));
  cheaperThan['init'] = init;
  cheaperThan[init[init.length - 1]?.name] = sortedInvestments.slice(0);
  for (let i = 0; i < sortedInvestments.length; i++) {
    cheaperThan[sortedInvestments[i]['name']] = sortedInvestments.slice(i + 1);
  }
  return cheaperThan;
};

export const combsN = ({ combsNMinusOne, maxPrice, cheaperThan }) => {
  if (!combsNMinusOne) {
    return [
      [
        cheaperThan['init'],
        cheaperThan['init'].reduce((acc, { price }) => acc + price, 0),
      ],
    ];
  }

  let withPrice = [];

  for (let i = 0; i < combsNMinusOne.length; i++) {
    const [invs, cost] = combsNMinusOne[i];

    const lastName = invs[invs.length - 1]?.name;
    const suffixes = cheaperThan[lastName];
    for (let j = 0; j < suffixes.length; j++) {
      const inv = suffixes[j];
      const totalCost = cost + inv.price;

      if (totalCost > maxPrice) {
        continue;
      }

      withPrice.push([[...invs, inv], totalCost]);
    }
  }

  return withPrice;
};

export const combinations = (investments, options = {}) => {
  const { maxPrice = Infinity, mandatory = [] } = options;

  const cheaperThan = buildCheaperThan(investments, mandatory);

  let combsNMinusOne;
  let results = [];
  for (let s = mandatory.length; s <= investments.length; s++) {
    combsNMinusOne = combsN({
      combsNMinusOne,
      maxPrice,
      cheaperThan,
    });
    for (let j = 0; j < combsNMinusOne.length; j++) {
      results.push(combsNMinusOne[j][0]);
    }
  }

  return results;
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
  let givini = 0;
  let computedInvestments = [];

  investments.forEach((investment) => {
    const invProfits = comp(investment.profits, updatedContext);

    price += investment.price;
    profits += invProfits;
    social += investment.social || 0;
    givini += investment.givini || 0;
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
    givini,
    investments: computedInvestments,
  };
};

export const isBetter = ({
  current,
  candidate,
  money,
  otherRequirements = {},
  context = {},
}) => {
  const { social = 0, givini = 0 } = otherRequirements;

  if (candidate.price > money) {
    return false;
  }

  if (candidate.social < social) {
    return false;
  }

  if (candidate.givini < givini) {
    return false;
  }

  if (otherRequirements.donovanKick) {
    if (
      !donovanHindered({
        investments: [
          ...(context.previousInvestments || []),
          ...candidate.investments.map(({ name }) => name),
        ],
      })
    ) {
      return false;
    }
  }

  if (!current) {
    return true;
  }

  return (
    candidate.profits > current.profits ||
    (candidate.profits === current.profits && candidate.price < current.price)
  );
};

export const best = ({
  money,
  otherRequirements = {},
  investments,
  context = {},
}) => {
  let result = null;

  combinations(investments, { maxPrice: money }).forEach((comb) => {
    const candidate = combine(comb, context);
    if (
      isBetter({
        current: result,
        candidate,
        money,
        otherRequirements,
        context,
      })
    ) {
      result = candidate;
    }
  });

  return result;
};

export const buildParams = ({ money, otherRequirements = {}, ...context }) => {
  const { previousInvestments = [] } = context;

  return {
    money,
    otherRequirements,
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
