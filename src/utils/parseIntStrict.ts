export const parseIntStrict = <F>(val: string, fallback?: () => F): number | F => {
  const parsed = parseInt(val);

  if (Number.isNaN(parsed)) {
    if (fallback) return fallback();
    else throw new Error(`could not convert '${val}' to an integer`);
  }
  return parsed;
};
