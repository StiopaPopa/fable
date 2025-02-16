import { defColor } from "../defcolor.js";
import { hcyRgb } from "../hcy/hcy-rgb.js";
import { hsiRgb } from "../hsi/hsi-rgb.js";
import { hslRgb } from "../hsl/hsl-rgb.js";
import { hsvRgb } from "../hsv/hsv-rgb.js";
import { intAbgr32Srgb, intArgb32Srgb } from "../int/int-srgb.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { srgbRgb } from "./srgb-rgb.js";
const srgb = defColor({
  mode: "srgb",
  order: ["r", "g", "b", "alpha"],
  from: {
    abgr32: (out, src) => intAbgr32Srgb(out, src[0]),
    argb32: (out, src) => intArgb32Srgb(out, src[0]),
    hcy: hcyRgb,
    hsi: hsiRgb,
    hsl: hslRgb,
    hsv: hsvRgb,
    rgb: rgbSrgb
  },
  toRgb: srgbRgb
});
export {
  srgb
};
