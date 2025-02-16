import { D65 } from "../api/constants.js";
import { defColor } from "../defcolor.js";
import { labLabD50_65 } from "../lab/lab-lab.js";
import { lchLab } from "../lab/lab-lch.js";
import { labXyzD65 } from "../lab/lab-xyz.js";
import { oklabXyzD65 } from "../oklab/oklab-xyz.js";
import { rgbXyzD65 } from "../rgb/rgb-xyz.js";
import { xyyXyz } from "../xyy/xyy-xyz.js";
import { xyzRgbD65 } from "./xyz-rgb.js";
const xyzD65 = defColor({
  mode: "xyz65",
  channels: {
    x: { range: [0, D65[0]] },
    y: { range: [0, D65[1]] },
    z: { range: [0, D65[2]] }
  },
  order: ["x", "y", "z", "alpha"],
  from: {
    rgb: rgbXyzD65,
    lab50: [labLabD50_65, labXyzD65],
    lab65: labXyzD65,
    lch: [lchLab, labLabD50_65, labXyzD65],
    oklab: oklabXyzD65,
    xyy: xyyXyz
  },
  toRgb: xyzRgbD65
});
export {
  xyzD65
};
