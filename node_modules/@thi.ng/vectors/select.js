const select = (out, a, b, mask) => {
  out = out || a;
  for (let i = a.length; i-- > 0; ) {
    out[i] = mask[i] ? b[i] : a[i];
  }
  return out;
};
export {
  select
};
