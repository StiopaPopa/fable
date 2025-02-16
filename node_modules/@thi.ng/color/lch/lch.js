import { defColor } from "../defcolor.js";
import { labLabD65_50 } from "../lab/lab-lab.js";
import { labLch, lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbLab } from "../rgb/rgb-lab.js";
import { xyzLab } from "../xyz/xyz-lab.js";
import { xyzXyzD65_50 } from "../xyz/xyz-xyz.js";
const lch = defColor({
  mode: "lch",
  channels: {
    c: { range: [0, 1.312] },
    h: { hue: true }
  },
  order: ["l", "c", "h", "alpha"],
  from: {
    rgb: (out, src) => labLch(null, rgbLab(out, src)),
    lab50: labLch,
    lab65: [labLabD65_50, labLch],
    xyz50: [xyzLab, labLch],
    xyz65: [xyzXyzD65_50, xyzLab, labLch]
  },
  toRgb: [lchLab, labRgb]
});
export {
  lch
};
