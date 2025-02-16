const tensor = (out, a, b) => {
  out = out || [];
  const n = a.length;
  const m = b.length;
  for (let i = 0, k = 0; i < m; i++) {
    const bb = b[i];
    for (let j = 0; j < n; j++) {
      out[k++] = a[j] * bb;
    }
  }
  return out;
};
export {
  tensor
};
