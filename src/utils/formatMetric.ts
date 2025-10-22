export const formatMetric = (n: number): string => {
  if (n < 1_000) return String(n);
  if (n < 1_000_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  if (n < 1_000_000_000)
    return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  return (n / 1_000_000_000).toFixed(1).replace(".0", "") + "B";
};
