const distBrayCurtis = (a, b) => {
  let c = 0;
  let s = 0;
  for (let i = a.length; i-- > 0; ) {
    c += Math.abs(a[i] - b[i]);
    s += Math.abs(a[i] + b[i]);
  }
  return s > 0 ? c / s : 0;
};
export {
  distBrayCurtis
};
