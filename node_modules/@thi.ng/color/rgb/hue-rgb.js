import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
const hueRgb = (out, hue, alpha = 1) => {
  hue = fract(hue) * 6;
  return setC4(
    out || [],
    clamp01(Math.abs(hue - 3) - 1),
    clamp01(2 - Math.abs(hue - 2)),
    clamp01(2 - Math.abs(hue - 4)),
    alpha
  );
};
const namedHueRgb = (out, hue, alpha = 1) => hueRgb(out, hue / 12, alpha);
export {
  hueRgb,
  namedHueRgb
};
