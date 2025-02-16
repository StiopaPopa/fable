const signedArea2 = (a, b, c) => {
  const ax = a[0];
  const ay = a[1];
  return (b[0] - ax) * (c[1] - ay) - (c[0] - ax) * (b[1] - ay);
};
const signedAreaC2 = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
export {
  signedArea2,
  signedAreaC2
};
