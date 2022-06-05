var stringSimilarity = require('string-similarity');

export const isPartialMatch = (
  s1: string | null | undefined,
  s2: string | null | undefined,
  threshold: number
) => {
  if (!s1 || !s2) return false;
  return (
    stringSimilarity.compareTwoStrings(s1.toLowerCase(), s2.toLowerCase()) >
    threshold
  );
};
