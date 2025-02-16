import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHcy } from "../rgb/rgb-hcy.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hcyRgb } from "./hcy-rgb.js";
const hcy = defColor({
  mode: "hcy",
  channels: { h: { hue: true } },
  order: ["h", "c", "y", "alpha"],
  from: { rgb: rgbHcy, srgb: rgbHcy, lch: [lchLab, labRgb, rgbSrgb, rgbHcy] },
  toRgb: hcyRgb
});
export {
  hcy
};
