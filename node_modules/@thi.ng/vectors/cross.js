import { setC3 } from "./setc.js";
const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];
const cross3 = (out, a, b) => setC3(
  out || a,
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
);
export {
  cross2,
  cross3
};
