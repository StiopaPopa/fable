import { RGB_XYZ_D50, RGB_XYZ_D65 } from "../api/constants.js";
import { clamp } from "../clamp.js";
import { __mulV33 } from "../internal/matrix-ops.js";
const rgbXyz = (out, src, mat = RGB_XYZ_D50) => __mulV33(null, mat, clamp(out, src));
const rgbXyzD65 = (out, src) => rgbXyz(out, src, RGB_XYZ_D65);
export {
  rgbXyz,
  rgbXyzD65
};
