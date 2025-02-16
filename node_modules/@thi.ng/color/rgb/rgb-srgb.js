import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
import { linearSrgb } from "../linear.js";
const rgbSrgb = (out, src) => setC4(
  out || src,
  linearSrgb(src[0]),
  linearSrgb(src[1]),
  linearSrgb(src[2]),
  __ensureAlpha(src[3])
);
const GAMMA = 1 / 2.2;
const rgbSrgbApprox = (out, src) => setC4(
  out || src,
  src[0] ** GAMMA,
  src[1] ** GAMMA,
  src[2] ** GAMMA,
  __ensureAlpha(src[3])
);
export {
  rgbSrgb,
  rgbSrgbApprox
};
