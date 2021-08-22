import {
  buildParams,
  combine,
  isBetter,
  buildCheaperThan,
  combsN,
  combsO,
} from './math';

let cleanParams;
let combs;
let best;

let cheaperThan;
let combsNMinusOne;

export const prepare = (params) => {
  cleanParams = buildParams(params);
  const mandatory = cleanParams.otherRequirements?.mandatory || [];
  cheaperThan = buildCheaperThan(cleanParams.investments, { mandatory });

  combsNMinusOne = combsO(
    cleanParams.investments,
    cleanParams.otherRequirements
  );
  combs = [...combsNMinusOne.map((l) => l[0])];

  best = null;

  return cleanParams.investments.length - combsNMinusOne[0][0].length;
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
