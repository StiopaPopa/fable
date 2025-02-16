import { srgbRgb } from "../srgb/srgb-rgb.js";
import {
  intAbgr32Srgb,
  intArgb32Srgb,
  intBgr24Srgb,
  intRgb24Srgb
} from "./int-srgb.js";
const intArgb32Rgb = (out, src) => srgbRgb(null, intArgb32Srgb(out, src));
const intRgb24Rgb = (out, src) => srgbRgb(null, intRgb24Srgb(out, src));
const intAbgr32Rgb = (out, src) => srgbRgb(null, intAbgr32Srgb(out, src));
const intBgr24Rgb = (out, src) => srgbRgb(null, intBgr24Srgb(out, src));
export {
  intAbgr32Rgb,
  intArgb32Rgb,
  intBgr24Rgb,
  intRgb24Rgb
};
