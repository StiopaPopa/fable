import { setC4 } from "@thi.ng/vectors/setc";
import { D50, D65 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
const __transform = (x) => x > 885645e-8 ? Math.cbrt(x) : 7.787037 * x + 16 / 116;
const xyzLab = (out, src, white = D50) => {
  const x = __transform(src[0] / white[0]);
  const y = __transform(src[1] / white[1]);
  const z = __transform(src[2] / white[2]);
  return setC4(
    out || src,
    1.16 * y - 0.16,
    5 * (x - y),
    2 * (y - z),
    __ensureAlpha(src[3])
  );
};
const xyzLabD65 = (out, src) => xyzLab(out, src, D65);
export {
  xyzLab,
  xyzLabD65
};
