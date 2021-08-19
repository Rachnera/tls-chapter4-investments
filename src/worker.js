import {
  buildParams,
  combine,
  isBetter,
  buildCheaperThan,
  combsN,
} from './math';
import { donovanHindered } from './misc';

let cleanParams;
let combs;
let best;

let cheaperThan;
let combsNMinusOne;

export const prepare = (params) => {
  cleanParams = buildParams(params);
  cheaperThan = buildCheaperThan(cleanParams.investments);

  // "Hack" to speed up computation time by a ton in that specific case
  if (cleanParams.otherRequirements?.donovanKick) {
    cheaperThan[undefined] = cheaperThan[undefined].filter((investment) =>
      donovanHindered({
        investments: [
          ...(cleanParams.context?.previousInvestments || []),
          investment.name,
        ],
      })
    );
  }

  combs = [];

  best = null;

  return cleanParams.investments.length;
};

export const preprocess = () => {
  combsNMinusOne = combsN({
    combsNMinusOne,
    maxPrice: cleanParams.money,
    cheaperThan,
  });
  for (let j = 0; j < combsNMinusOne.length; j++) {
    combs.push(combsNMinusOne[j][0]);
  }
  return combsNMinusOne.length;
};

export const process = (start, end) => {
  const { money, otherRequirements, context } = cleanParams;

  for (let i = start; i < end; i++) {
    const comb = combs[i];
    const candidate = combine(comb, context);
    if (
      isBetter({ current: best, candidate, money, otherRequirements, context })
    ) {
      best = candidate;
    }
  }

  return best;
};

export const clean = () => {
  cleanParams = undefined;
  combs = undefined;
  best = undefined;

  cheaperThan = undefined;
  combsNMinusOne = undefined;
};
