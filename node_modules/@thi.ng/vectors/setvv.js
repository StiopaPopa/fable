import { setC, setC4, setC6 } from "./setc.js";
const setVV4 = (out, a, b) => setC4(out, a[0], a[1], b[0], b[1]);
const setVV6 = (out, a, b, c) => setC6(out, a[0], a[1], b[0], b[1], c[0], c[1]);
const setVV9 = (out, a, b, c) => setC(out, a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
const setVV16 = (out, a, b, c, d) => setC(
  out,
  a[0],
  a[1],
  a[2],
  a[3],
  b[0],
  b[1],
  b[2],
  b[3],
  c[0],
  c[1],
  c[2],
  c[3],
  d[0],
  d[1],
  d[2],
  d[3]
);
export {
  setVV16,
  setVV4,
  setVV6,
  setVV9
};
