import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labXyz, labXyzD65 } from "../lab/lab-xyz.js";
import { rgbOklab } from "../rgb/rgb-oklab.js";
import { xyzOklab } from "../xyz/xyz-oklab.js";
import { xyzXyzD50_65 } from "../xyz/xyz-xyz.js";
import { oklabRgb } from "./oklab-rgb.js";
const oklab = defColor({
  mode: "oklab",
  channels: {
    a: { range: [-0.2339, 0.2762] },
    b: { range: [-0.3115, 0.1986] }
  },
  order: ["l", "a", "b", "alpha"],
  from: {
    lab50: [labXyz, xyzXyzD50_65, xyzOklab],
    lab65: [labXyzD65, xyzOklab],
    lch: [lchLab, labXyzD65, xyzOklab],
    rgb: rgbOklab,
    xyz50: [xyzXyzD50_65, xyzOklab],
    xyz65: xyzOklab
  },
  toRgb: oklabRgb
});
export {
  oklab
};
