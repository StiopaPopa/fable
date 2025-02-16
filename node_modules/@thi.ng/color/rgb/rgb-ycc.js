import { dot3 } from "@thi.ng/vectors/dot";
import { setC4 } from "@thi.ng/vectors/setc";
import { RGB_LUMINANCE_REC709 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
const rgbYcc = (out, src, luma = RGB_LUMINANCE_REC709) => {
  const y = dot3(src, luma);
  return setC4(
    out || src,
    y,
    0.5 * (src[2] - y) / (1 - luma[2]),
    0.5 * (src[0] - y) / (1 - luma[0]),
    __ensureAlpha(src[3])
  );
};
export {
  rgbYcc
};
