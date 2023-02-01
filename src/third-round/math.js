// Some extra, not as optimized but with hopefully simpler code, math to handle pre-war headquarters purchases

// https://stackoverflow.com/questions/127704/algorithm-to-return-all-combinations-of-k-elements-from-n/8171776#8171776
export const combinations = (list) => {
  if (list.length === 0) {
    return [[]];
  }

  const result = [];
  const fn = (active, rest) => {
    if (rest.length === 0) {
      result.push(active);
      return;
    }

    const [first, ...newRest] = rest;

    fn([...active, first], newRest);
    fn(active, newRest);
  };
  fn([], list);

  return result;
};
