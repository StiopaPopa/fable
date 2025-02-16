import { rgbSrgb } from "./rgb-srgb.js";
import { srgbCss } from "../srgb/srgb-css.js";
const rgbCss = (src) => srgbCss(rgbSrgb([], src));
export {
  rgbCss
};
