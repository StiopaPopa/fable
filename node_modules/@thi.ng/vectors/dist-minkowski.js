const distMinkowski = (a, b, p) => {
  let delta = 0;
  for (let i = a.length; i-- > 0; ) {
    delta += Math.abs(a[i] - b[i]) ** p;
  }
  return delta ** (1 / p);
};
export {
  distMinkowski
};
