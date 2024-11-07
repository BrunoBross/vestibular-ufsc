export const formatDecimal = (value: number): number => {
  return Number(value.toFixed(2).replace(/\.?0+$/, ""));
};
