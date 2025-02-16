import { dot3 } from "@thi.ng/vectors/dot";
import { RGB_LUMINANCE_REC709, RGB_LUMINANCE_REC601 } from "./api/constants.js";
const luminanceRgb = (rgb, weights = RGB_LUMINANCE_REC709) => dot3(rgb, weights);
const luminanceSrgb = (rgb) => dot3(rgb, RGB_LUMINANCE_REC601);
const luminanceIntArgb32 = (rgb) => ((rgb >>> 16 & 255) * 76 + (rgb >>> 8 & 255) * 150 + (rgb & 255) * 29) / 65025;
const luminanceIntAbgr32 = (rgb) => ((rgb >>> 16 & 255) * 29 + (rgb >>> 8 & 255) * 150 + (rgb & 255) * 76) / 65025;
const luminanceArgb32 = (argb) => luminanceIntArgb32(argb[0]);
const luminanceAbgr32 = (argb) => luminanceIntAbgr32(argb[0]);
export {
  luminanceAbgr32,
  luminanceArgb32,
  luminanceIntAbgr32,
  luminanceIntArgb32,
  luminanceRgb,
  luminanceSrgb
};
