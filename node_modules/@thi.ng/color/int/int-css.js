import { U24 } from "@thi.ng/strings/radix";
import { FF, INV8BIT } from "../api/constants.js";
const intArgb32Css = (src) => {
  const a = src >>> 24;
  return a < 255 ? `rgba(${src >> 16 & 255},${src >> 8 & 255},${src & 255},${FF(
    a * INV8BIT
  )})` : `#${U24(src & 16777215)}`;
};
const intRgb24Css = (src) => `#${U24(src & 16777215)}`;
export {
  intArgb32Css,
  intRgb24Css
};
