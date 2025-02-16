const distHamming = (a, b) => {
  let delta = 0;
  for (let i = a.length; i-- > 0; ) {
    a[i] !== b[i] && delta++;
  }
  return delta / a.length;
};
export {
  distHamming
};
