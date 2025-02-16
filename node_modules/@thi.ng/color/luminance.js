import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { rgb } from "./rgb/rgb.js";
import {
  luminanceAbgr32,
  luminanceArgb32,
  luminanceRgb,
  luminanceSrgb
} from "./luminance-rgb.js";
import { __dispatch0 } from "./internal/dispatch.js";
const luminance = defmulti(
  __dispatch0,
  { lch: "lab", oklab: "lab", ycc: "lab", xyy: "hcy" },
  {
    argb32: luminanceArgb32,
    abgr32: luminanceAbgr32,
    hcy: (x) => x[2],
    lab: (x) => x[0],
    rgb: luminanceRgb,
    srgb: luminanceSrgb,
    xyz: (x) => x[1],
    [DEFAULT]: (x) => luminanceRgb(rgb(x))
  }
);
export {
  luminance
};
