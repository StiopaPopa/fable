import { U24 } from "@thi.ng/strings/radix";
import { FF } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
import { __scale8bit } from "../internal/scale.js";
const srgbCss = (src) => {
  const r = __scale8bit(src[0]);
  const g = __scale8bit(src[1]);
  const b = __scale8bit(src[2]);
  const a = __ensureAlpha(src[3]);
  return a < 1 ? `rgba(${r},${g},${b},${FF(a)})` : `#${U24(r << 16 | g << 8 | b)}`;
};
export {
  srgbCss
};
