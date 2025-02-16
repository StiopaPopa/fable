import { setC4 } from "@thi.ng/vectors/setc";
import { D50, D65 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
const __transform = (x) => {
  const y = x ** 3;
  return y > 8856e-6 ? y : (x - 16 / 116) / 7.787;
};
const labXyz = (out, src, white = D50) => {
  const y = (src[0] + 0.16) / 1.16;
  return setC4(
    out || src,
    __transform(src[1] / 5 + y) * white[0],
    __transform(y) * white[1],
    __transform(y - src[2] / 2) * white[2],
    __ensureAlpha(src[3])
  );
};
const labXyzD65 = (out, src) => labXyz(out, src, D65);
export {
  labXyz,
  labXyzD65
};
