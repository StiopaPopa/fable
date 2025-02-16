import { atan2Abs } from "@thi.ng/math/angle";
import { INV_TAU } from "@thi.ng/math/api";
import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
const oklabOklch = (out, src) => setC4(
  out || src,
  src[0],
  Math.hypot(src[1], src[2]),
  atan2Abs(src[2], src[1]) * INV_TAU,
  __ensureAlpha(src[3])
);
export {
  oklabOklch
};
