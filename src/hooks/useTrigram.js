export const useTrigram = () => {
  const triGram = (txt) => {
    const map = {};
    const s1 = (txt || "").toLowerCase();
    const n = 3;
    for (let k = 0; k <= s1.length - n; k++) {
      map[s1.substring(k, k + n)] = true;
    }
    return map;
  };

  return triGram;
};
