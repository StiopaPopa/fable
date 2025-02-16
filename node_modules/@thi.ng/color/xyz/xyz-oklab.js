import { powN3 } from "@thi.ng/vectors/pown";
import { OKLAB_M1, OKLAB_M2 } from "../api/constants.js";
import { __mulV33 } from "../internal/matrix-ops.js";
const xyzOklab = (out, src) => __mulV33(null, OKLAB_M2, powN3(null, __mulV33(out, OKLAB_M1, src), 1 / 3));
export {
  xyzOklab
};
