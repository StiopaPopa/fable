import { rgbXyz, rgbXyzD65 } from "./rgb-xyz.js";
import { xyzLab, xyzLabD65 } from "../xyz/xyz-lab.js";
const rgbLab = (out, src) => xyzLab(null, rgbXyz(out, src));
const rgbLabD65 = (out, src) => xyzLabD65(null, rgbXyzD65(out, src));
export {
  rgbLab,
  rgbLabD65
};
