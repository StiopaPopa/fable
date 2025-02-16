import { powN3 } from "@thi.ng/vectors/pown";
import { OKLAB_M2 } from "../api/constants.js";
import { __mulV33 } from "../internal/matrix-ops.js";
const CONE_LMS = [
  0.4122214708,
  0.2119034982,
  0.0883024619,
  0.5363325363,
  0.6806995451,
  0.2817188376,
  0.0514459929,
  0.1073969566,
  0.6299787005
];
const rgbOklab = (out, src) => __mulV33(null, OKLAB_M2, powN3(null, __mulV33(out, CONE_LMS, src), 1 / 3));
export {
  rgbOklab
};
