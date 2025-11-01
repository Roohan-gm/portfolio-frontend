export const formatMetric = (n: number): string => {
  const rounded = Math.round(n); // Round first!
  if (rounded < 1_000) return String(rounded);
  if (rounded < 1_000_000) return (rounded / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  if (rounded < 1_000_000_000) return (rounded / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  return (rounded / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
};