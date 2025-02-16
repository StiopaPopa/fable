import { direction2 } from "./direction.js";
import { perpendicularCCW, perpendicularCW } from "./perpendicular.js";
const normalCCW = (out, a, b, n = 1) => perpendicularCCW(null, direction2(out || [], a, b, n));
const normalCW = (out, a, b, n = 1) => perpendicularCW(null, direction2(out || [], a, b, n));
export {
  normalCCW,
  normalCW
};
