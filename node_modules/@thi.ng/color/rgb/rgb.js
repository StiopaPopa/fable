import { set4 } from "@thi.ng/vectors/set";
import { defColor } from "../defcolor.js";
import { hcyRgb } from "../hcy/hcy-rgb.js";
import { hsiRgb } from "../hsi/hsi-rgb.js";
import { hslRgb } from "../hsl/hsl-rgb.js";
import { hsvRgb } from "../hsv/hsv-rgb.js";
import { intAbgr32Rgb, intArgb32Rgb } from "../int/int-rgb.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb, labRgbD65 } from "../lab/lab-rgb.js";
import { oklabRgb } from "../oklab/oklab-rgb.js";
import { srgbRgb } from "../srgb/srgb-rgb.js";
import { xyyXyz } from "../xyy/xyy-xyz.js";
import { xyzRgb, xyzRgbD65 } from "../xyz/xyz-rgb.js";
import { yccRgb } from "../ycc/ycc-rgb.js";
const rgb = defColor({
  mode: "rgb",
  order: ["r", "g", "b", "alpha"],
  from: {
    abgr32: (out, src) => intAbgr32Rgb(out, src[0]),
    argb32: (out, src) => intArgb32Rgb(out, src[0]),
    hcy: hcyRgb,
    hsi: hsiRgb,
    hsl: hslRgb,
    hsv: hsvRgb,
    lab50: labRgb,
    lab65: labRgbD65,
    lch: [lchLab, labRgb],
    oklab: oklabRgb,
    rgb: set4,
    srgb: srgbRgb,
    xyy: [xyyXyz, xyzRgbD65],
    xyz50: xyzRgb,
    xyz65: xyzRgbD65,
    ycc: yccRgb
  },
  toRgb: set4
});
export {
  rgb
};
