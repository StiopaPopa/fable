import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHsi } from "../rgb/rgb-hsi.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hsiRgb } from "./hsi-rgb.js";
const hsi = defColor({
  mode: "hsi",
  channels: { h: { hue: true } },
  order: ["h", "s", "i", "alpha"],
  from: { rgb: rgbHsi, srgb: rgbHsi, lch: [lchLab, labRgb, rgbSrgb, rgbHsi] },
  toRgb: hsiRgb
});
export {
  hsi
};
