import { float } from "@thi.ng/strings/float";
import { percent } from "@thi.ng/strings/percent";
const BLACK = Object.freeze([0, 0, 0, 1]);
const WHITE = Object.freeze([1, 1, 1, 1]);
const RED = Object.freeze([1, 0, 0, 1]);
const GREEN = Object.freeze([0, 1, 0, 1]);
const BLUE = Object.freeze([0, 0, 1, 1]);
const CYAN = Object.freeze([0, 1, 1, 1]);
const MAGENTA = Object.freeze([1, 0, 1, 1]);
const YELLOW = Object.freeze([1, 1, 0, 1]);
const RGB_LUMINANCE_REC601 = [0.299, 0.587, 0.114];
const RGB_LUMINANCE_REC709 = [0.2126, 0.7152, 0.0722];
const RGB_LUMINANCE_REC2020 = [0.2627, 0.678, 0.0593];
const RGB_XYZ_D50 = [
  0.4360747,
  0.2225045,
  0.0139322,
  0.3850649,
  0.7168786,
  0.0971045,
  0.1430804,
  0.0606169,
  0.7141733
];
const XYZ_RGB_D50 = [
  3.1338561,
  -0.9787684,
  0.0719453,
  -1.6168667,
  1.9161415,
  -0.2289914,
  -0.4906146,
  0.033454,
  1.4052427
];
const RGB_XYZ_D65 = [
  0.4124564,
  0.2126729,
  0.0193339,
  0.3575761,
  0.7151522,
  0.119192,
  0.1804375,
  0.072175,
  0.9503041
];
const XYZ_RGB_D65 = [
  3.2404542,
  -0.969266,
  0.0556434,
  -1.5371385,
  1.8760108,
  -0.2040259,
  -0.4985314,
  0.041556,
  1.0572252
];
const BRADFORD_D50_D65 = [
  0.9555766,
  -0.0282895,
  0.0122982,
  -0.0230393,
  1.0099416,
  -0.020483,
  0.0631636,
  0.0210077,
  1.3299098
];
const BRADFORD_D65_D50 = [
  1.0478112,
  0.0295424,
  -92345e-7,
  0.0228866,
  0.9904844,
  0.0150436,
  -0.050127,
  -0.0170491,
  0.7521316
];
const D50 = [0.96422, 1, 0.82521];
const D65 = [0.95047, 1, 1.08883];
const OKLAB_M1 = [
  0.8189330101,
  0.0329845436,
  0.0482003018,
  0.3618667424,
  0.9293118715,
  0.2643662691,
  -0.1288597137,
  0.0361456387,
  0.633851707
];
const OKLAB_M2 = [
  0.2104542553,
  1.9779984951,
  0.0259040371,
  0.793617785,
  -2.428592205,
  0.7827717662,
  -0.0040720468,
  0.4505937099,
  -0.808675766
];
let FF = float(3);
let PC = percent(3);
const setPrecision = (x) => {
  FF = float(x);
  PC = percent(x);
};
const INV8BIT = 1 / 255;
const EPS = 1 / 256;
export {
  BLACK,
  BLUE,
  BRADFORD_D50_D65,
  BRADFORD_D65_D50,
  CYAN,
  D50,
  D65,
  EPS,
  FF,
  GREEN,
  INV8BIT,
  MAGENTA,
  OKLAB_M1,
  OKLAB_M2,
  PC,
  RED,
  RGB_LUMINANCE_REC2020,
  RGB_LUMINANCE_REC601,
  RGB_LUMINANCE_REC709,
  RGB_XYZ_D50,
  RGB_XYZ_D65,
  WHITE,
  XYZ_RGB_D50,
  XYZ_RGB_D65,
  YELLOW,
  setPrecision
};
