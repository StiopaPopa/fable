import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";
const __isWhiteHsv = (x, eps = EPS) => x[1] <= eps && x[2] >= 1 - eps;
const __isWhiteRgb = (x, eps = EPS) => {
  eps = 1 - eps;
  return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};
const __isWhiteLch = (x, eps = EPS) => x[1] <= eps && x[0] >= 1 - eps;
const isWhite = defmulti(
  __dispatch0,
  {
    hsl: "hsv",
    hsi: "hsv",
    labD50: "lch",
    labD65: "lch",
    srgb: "rgb",
    ycc: "lch"
  },
  {
    [DEFAULT]: (x) => __isWhiteRgb(rgb(x)),
    hcy: (x, eps = EPS) => x[1] <= eps && x[2] >= 1 - eps,
    hsv: __isWhiteHsv,
    lch: __isWhiteLch,
    rgb: __isWhiteRgb
  }
);
export {
  isWhite
};
