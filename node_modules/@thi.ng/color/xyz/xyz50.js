import { D50 } from "../api/constants.js";
import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labXyz, labXyzD65 } from "../lab/lab-xyz.js";
import { oklabXyzD65 } from "../oklab/oklab-xyz.js";
import { rgbXyz } from "../rgb/rgb-xyz.js";
import { xyyXyz } from "../xyy/xyy-xyz.js";
import { xyzRgb } from "./xyz-rgb.js";
import { xyzXyzD65_50 } from "./xyz-xyz.js";
const xyzD50 = defColor({
  mode: "xyz50",
  channels: {
    x: { range: [0, D50[0]] },
    y: { range: [0, D50[1]] },
    z: { range: [0, D50[2]] }
  },
  order: ["x", "y", "z", "alpha"],
  from: {
    rgb: rgbXyz,
    lab50: labXyz,
    lab65: [labXyzD65, xyzXyzD65_50],
    lch: [lchLab, labXyz],
    oklab: [oklabXyzD65, xyzXyzD65_50],
    xyy: xyyXyz
  },
  toRgb: xyzRgb
});
export {
  xyzD50
};
