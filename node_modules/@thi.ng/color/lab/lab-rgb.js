import { labXyz, labXyzD65 } from "./lab-xyz.js";
import { xyzRgb, xyzRgbD65 } from "../xyz/xyz-rgb.js";
const labRgb = (out, src) => xyzRgb(null, labXyz(out, src));
const labRgbD65 = (out, src) => xyzRgbD65(null, labXyzD65(out, src));
export {
  labRgb,
  labRgbD65
};
