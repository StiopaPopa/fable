import { XYZ_RGB_D50, XYZ_RGB_D65 } from "../api/constants.js";
import { __mulV33 } from "../internal/matrix-ops.js";
const xyzRgb = (out, src, mat = XYZ_RGB_D50) => __mulV33(out, mat, src);
const xyzRgbD65 = (out, src) => xyzRgb(out, src, XYZ_RGB_D65);
export {
  xyzRgb,
  xyzRgbD65
};
