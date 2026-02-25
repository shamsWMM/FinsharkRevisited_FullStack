export const formatNumber = (num: number): string => {
  if (!Number.isFinite(num)) return "N/A";

  if (num < 0) {
    return "-" + formatNumber(-1 * num);
  }
  if (num < 1000) {
    return num.toFixed(0);
  } else if (num < 1_000_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else {
    return (num / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatDollarValue = (num: number): string => {
  return "$" + formatNumber(num);
};

export const formatRatio = (ratio: number): string => {
  if (!Number.isFinite(ratio)) return "N/A";
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
