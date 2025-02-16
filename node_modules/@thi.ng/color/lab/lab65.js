import { defColor } from "../defcolor.js";
import { rgbLabD65 } from "../rgb/rgb-lab.js";
import { xyzLabD65 } from "../xyz/xyz-lab.js";
import { xyzXyzD50_65 } from "../xyz/xyz-xyz.js";
import { labLabD50_65 } from "./lab-lab.js";
import { lchLab } from "./lab-lch.js";
import { labRgbD65 } from "./lab-rgb.js";
const labD65 = defColor({
  mode: "lab65",
  channels: {
    a: { range: [-0.8618, 0.9823] },
    b: { range: [-1.0786, 0.9448] }
  },
  order: ["l", "a", "b", "alpha"],
  from: {
    rgb: rgbLabD65,
    lch: [lchLab, labLabD50_65],
    lab50: labLabD50_65,
    xyz50: [xyzXyzD50_65, xyzLabD65],
    xyz65: xyzLabD65
  },
  toRgb: labRgbD65
});
export {
  labD65
};
