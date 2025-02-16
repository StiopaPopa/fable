import { safeDiv } from "@thi.ng/math/safe-div";
import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
const xyzXyy = (out, src) => {
  const { 0: x, 1: Y } = src;
  const sum = x + Y + src[2];
  return setC4(
    out || src,
    safeDiv(x, sum),
    safeDiv(Y, sum),
    Y,
    __ensureAlpha(src[3])
  );
};
export {
  xyzXyy
};
