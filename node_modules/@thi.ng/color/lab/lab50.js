import { defColor } from "../defcolor.js";
import { rgbLab } from "../rgb/rgb-lab.js";
import { xyzLab } from "../xyz/xyz-lab.js";
import { xyzXyzD65_50 } from "../xyz/xyz-xyz.js";
import { labLabD65_50 } from "./lab-lab.js";
import { lchLab } from "./lab-lch.js";
import { labRgb } from "./lab-rgb.js";
const labD50 = defColor({
  mode: "lab50",
  channels: {
    a: { range: [-0.7929, 0.9355] },
    b: { range: [-1.1203, 0.9339] }
  },
  order: ["l", "a", "b", "alpha"],
  from: {
    rgb: rgbLab,
    lch: lchLab,
    lab65: labLabD65_50,
    xyz50: xyzLab,
    xyz65: [xyzXyzD65_50, xyzLab]
  },
  toRgb: labRgb
});
export {
  labD50
};
