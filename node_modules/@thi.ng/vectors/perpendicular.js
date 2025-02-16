import { setC2 } from "./setc.js";
const perpendicularCCW = (out, a) => setC2(out || a, -a[1], a[0]);
const perpendicularCW = (out, a) => setC2(out || a, a[1], -a[0]);
export {
  perpendicularCCW,
  perpendicularCW
};
