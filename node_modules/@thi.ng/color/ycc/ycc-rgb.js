import { setC4 } from "@thi.ng/vectors/setc";
import { RGB_LUMINANCE_REC709 } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
const yccRgb = (out, src, luma = RGB_LUMINANCE_REC709) => {
  const y = src[0];
  const bb = (2 - 2 * luma[2]) * src[1];
  const rr = (2 - 2 * luma[0]) * src[2];
  return setC4(
    out || src,
    y + rr,
    y - luma[2] / luma[1] * bb - luma[0] / luma[1] * rr,
    y + bb,
    __ensureAlpha(src[3])
  );
};
export {
  yccRgb
};
