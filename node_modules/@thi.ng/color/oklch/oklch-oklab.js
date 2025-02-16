import { cossin } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import { setC4 } from "@thi.ng/vectors/setc";
import { __ensureAlpha } from "../internal/ensure.js";
const oklchOklab = (out, src) => setC4(
  out || src,
  src[0],
  ...cossin(src[2] * TAU, src[1]),
  __ensureAlpha(src[3])
);
export {
  oklchOklab
};
