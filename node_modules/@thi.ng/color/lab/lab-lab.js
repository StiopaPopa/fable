import { xyzLab, xyzLabD65 } from "../xyz/xyz-lab.js";
import { xyzXyzD50_65, xyzXyzD65_50 } from "../xyz/xyz-xyz.js";
import { labXyz, labXyzD65 } from "./lab-xyz.js";
const labLabD50_65 = (out, src) => xyzLabD65(out, xyzXyzD50_65(out, labXyz(out, src)));
const labLabD65_50 = (out, src) => xyzLab(out, xyzXyzD65_50(out, labXyzD65(out, src)));
export {
  labLabD50_65,
  labLabD65_50
};
