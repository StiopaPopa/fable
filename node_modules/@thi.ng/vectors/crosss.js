import { setCS3 } from "./setcs.js";
const crossS2 = (a, b, ia = 0, ib = 0, sa = 1, sb = 1) => a[ia] * b[ib + sb] - a[ia + sa] * b[ib];
const crossS3 = (out, a, b, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => setCS3(
  out || a,
  a[ia + sa] * b[ib + 2 * sb] - a[ia + 2 * sa] * b[ib + sb],
  a[ia + 2 * sa] * b[ib] - a[ia] * b[ib + 2 * sb],
  a[ia] * b[ib + sb] - a[ia + sa] * b[ib],
  io,
  so
);
export {
  crossS2,
  crossS3
};
