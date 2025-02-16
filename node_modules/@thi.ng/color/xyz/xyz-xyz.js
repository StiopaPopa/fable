import { BRADFORD_D50_D65, BRADFORD_D65_D50 } from "../api/constants.js";
import { __mulV33 } from "../internal/matrix-ops.js";
const xyzXyzD65_50 = (out, src) => __mulV33(out, BRADFORD_D65_D50, src);
const xyzXyzD50_65 = (out, src) => __mulV33(out, BRADFORD_D50_D65, src);
export {
  xyzXyzD50_65,
  xyzXyzD65_50
};
