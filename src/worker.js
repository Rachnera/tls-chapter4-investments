import { buildParams, combinations, combine, isBetter } from './math';

let cleanParams;
let combs;
let best;

export const prepare = (params) => {
  cleanParams = buildParams(params);
  combs = combinations(cleanParams.investments, cleanParams.money);
  best = {
    price: 0,
    profits: 0,
    social: 0,
    investments: [],
  };

  return combs.length;
};

export const process = (start, end) => {
  const { money, social, context } = cleanParams;

  for (let i = start; i < end; i++) {
    const comb = combs[i];
    const candidate = combine(comb, context);
    if (isBetter({ current: best, candidate, money, social })) {
      best = candidate;
    }
  }

  return best;
};

export const clean = () => {
  cleanParams = undefined;
  combs = undefined;
  best = undefined;
};
