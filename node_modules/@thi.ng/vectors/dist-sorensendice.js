const distSorensenDice = (a, b) => {
  let numTP = 0;
  let numFP = 0;
  for (let i = a.length; i-- > 0; ) {
    const aa = a[i] !== 0;
    const bb = b[i] !== 0;
    numTP += ~~(aa && bb);
    numFP += ~~(aa !== bb);
  }
  return numFP ? numFP / (2 * numTP + numFP) : 0;
};
export {
  distSorensenDice
};
