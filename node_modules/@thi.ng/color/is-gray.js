import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";
const __isGrayHsv = (x, eps = EPS) => x[1] <= eps;
const __isGrayRgb = (x, eps = EPS) => eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);
const __isGrayLab = (x, eps = EPS) => eqDelta(x[1], 0, eps) && eqDelta(x[2], 0, eps);
const isGray = defmulti(
  __dispatch0,
  {
    hcy: "hsv",
    hsi: "hsv",
    hsl: "hsv",
    lch: "hsv",
    labD65: "labD50",
    srgb: "rgb",
    ycc: "labD50"
  },
  {
    [DEFAULT]: (x) => __isGrayRgb(rgb(x)),
    hsv: __isGrayHsv,
    labD50: __isGrayLab,
    rgb: __isGrayRgb
  }
);
export {
  isGray
};
