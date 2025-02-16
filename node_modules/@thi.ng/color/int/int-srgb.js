import { setC4 } from "@thi.ng/vectors/setc";
import { INV8BIT } from "../api/constants.js";
const intArgb32Srgb = (out, src) => setC4(
  out || [],
  (src >>> 16 & 255) * INV8BIT,
  (src >>> 8 & 255) * INV8BIT,
  (src & 255) * INV8BIT,
  (src >>> 24) * INV8BIT
);
const intAbgr32Srgb = (out, src) => setC4(
  out || [],
  (src & 255) * INV8BIT,
  (src >>> 8 & 255) * INV8BIT,
  (src >>> 16 & 255) * INV8BIT,
  (src >>> 24) * INV8BIT
);
const intRgb24Srgb = (out, src) => intArgb32Srgb(out, src | 4278190080);
const intBgr24Srgb = (out, src) => intAbgr32Srgb(out, src | 4278190080);
export {
  intAbgr32Srgb,
  intArgb32Srgb,
  intBgr24Srgb,
  intRgb24Srgb
};
