import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { FF, PC } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";
const hslCss = (src) => {
  const h = FF(fract(src[0]) * 360);
  const s = PC(clamp01(src[1]));
  const l = PC(clamp01(src[2]));
  const a = __ensureAlpha(src[3]);
  return a < 1 ? `hsla(${h},${s},${l},${FF(a)})` : `hsl(${h},${s},${l})`;
};
export {
  hslCss
};
