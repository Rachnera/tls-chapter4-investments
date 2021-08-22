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
  const mandatory = cleanParams.otherRequirements?.mandatory || [];
  cheaperThan = buildCheaperThan(cleanParams.investments, mandatory);

  if (cleanParams.otherRequirements?.donovanKick) {
    const previous = cleanParams.context?.previousInvestments || [];
    if (!donovanHindered([...previous, ...mandatory])) {
      // "Hack" to speed up computation time by a ton in that specific case
      const key = mandatory[mandatory.length - 1];
      cheaperThan[key] = cheaperThan[key].filter((investment) =>
        donovanHindered([investment.name])
      );
    }
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
  const { otherRequirements, context } = cleanParams;

  for (let i = start; i < end; i++) {
    const comb = combs[i];
    const candidate = combine(comb, context);
    if (isBetter({ current: best, candidate, otherRequirements, context })) {
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
