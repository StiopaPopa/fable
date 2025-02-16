import { defColor } from "../defcolor.js";
import { hslHsv } from "../hsl/hsl-hsv.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHsv } from "../rgb/rgb-hsv.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hsvRgb } from "./hsv-rgb.js";
const hsv = defColor({
  mode: "hsv",
  channels: { h: { hue: true } },
  order: ["h", "s", "v", "alpha"],
  from: {
    rgb: rgbHsv,
    srgb: rgbHsv,
    hsl: hslHsv,
    lch: [lchLab, labRgb, rgbSrgb, rgbHsv]
  },
  toRgb: hsvRgb
});
export {
  hsv
};
