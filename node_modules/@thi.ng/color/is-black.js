import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";
const __isBlackHsv = (x, eps = EPS) => x[2] <= eps;
const __isBlackRgb = (x, eps = EPS) => x[0] <= eps && x[1] <= eps && x[2] <= eps;
const __isBlackLch = (x, eps = EPS) => x[0] <= eps;
const isBlack = defmulti(
  __dispatch0,
  {
    hcy: "hsv",
    hsi: "hsv",
    hsl: "hsv",
    labD50: "lch",
    labD65: "lch",
    srgb: "rgb",
    ycc: "rgb"
  },
  {
    [DEFAULT]: (x) => __isBlackRgb(rgb(x)),
    hsv: __isBlackHsv,
    lch: __isBlackLch,
    rgb: __isBlackRgb
  }
);
export {
  isBlack
};
