import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
import { srgbLinear } from "../linear.js";
const srgbRgb = (out, src) => setC4(
  out || src,
  srgbLinear(src[0]),
  srgbLinear(src[1]),
  srgbLinear(src[2]),
  __ensureAlpha(src[3])
);
const GAMMA = 2.2;
const srgbRgbApprox = (out, src) => setC4(
  out || src,
  src[0] ** GAMMA,
  src[1] ** GAMMA,
  src[2] ** GAMMA,
  __ensureAlpha(src[3])
);
export {
  srgbRgb,
  srgbRgbApprox
};
