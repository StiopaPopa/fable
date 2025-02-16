import { safeDiv } from "@thi.ng/math/safe-div";
import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
const xyyXyz = (out, src) => {
  const { 0: x, 1: y, 2: Y } = src;
  return setC4(
    out || src,
    safeDiv(Y * x, y),
    Y,
    safeDiv(Y * (1 - x - y), y),
    __ensureAlpha(src[3])
  );
};
export {
  xyyXyz
};
