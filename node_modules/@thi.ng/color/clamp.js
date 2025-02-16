import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "./internal/ensure.js";
const clamp = (out, src, alpha = 1) => setC4(
  out || src,
  clamp01(src[0]),
  clamp01(src[1]),
  clamp01(src[2]),
  __ensureAlpha(src[3], alpha)
);
const clampH = (out, src, alpha = 1) => setC4(
  out || src,
  fract(src[0]),
  clamp01(src[1]),
  clamp01(src[2]),
  __ensureAlpha(src[3], alpha)
);
export {
  clamp,
  clampH
};
