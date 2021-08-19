export const donovanHindered = ({ investments }) => {
  const requireAnyOf = ['War Monument', 'Givini Mage Guild'];

  return investments.some(({ name }) => requireAnyOf.includes(name));
};
