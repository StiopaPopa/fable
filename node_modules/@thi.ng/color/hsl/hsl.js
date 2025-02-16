import { defColor } from "../defcolor.js";
import { hsvHsl } from "../hsv/hsv-hsl.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHsl } from "../rgb/rgb-hsl.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hslRgb } from "./hsl-rgb.js";
const hsl = defColor({
  mode: "hsl",
  channels: { h: { hue: true } },
  order: ["h", "s", "l", "alpha"],
  from: {
    rgb: rgbHsl,
    srgb: rgbHsl,
    hsv: hsvHsl,
    lch: [lchLab, labRgb, rgbSrgb, rgbHsl]
  },
  toRgb: hslRgb
});
export {
  hsl
};
