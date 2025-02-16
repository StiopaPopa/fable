import { defmulti } from "@thi.ng/defmulti/defmulti";
import { fit } from "@thi.ng/math/fit";
import { fract } from "@thi.ng/math/prec";
import { ONE3 } from "@thi.ng/vectors/api";
import { setC4 } from "@thi.ng/vectors/setc";
import { sub3 } from "@thi.ng/vectors/sub";
import { clamp } from "./clamp.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";
const invertRgb = (out, src) => {
  out = clamp(out || src, src);
  return sub3(out, ONE3, out);
};
const invertInt = (src) => src ^ 16777215;
const invert = defmulti(
  __dispatch1,
  {
    hcy: "hsv",
    hsi: "hsv",
    hsl: "hsv",
    labD65: "labD50",
    oklab: "labD50",
    srgb: "rgb"
  },
  {
    hsv: (out, src) => setC4(
      out || src,
      fract(src[0] + 0.5),
      src[1],
      1 - src[2],
      __ensureAlpha(src[3])
    ),
    labD50: (out, src) => {
      const [min, max] = src.range;
      return setC4(
        out || src,
        1 - src[0],
        __invert1(src[1], min[1], max[1]),
        __invert1(src[2], min[2], max[2]),
        __ensureAlpha(src[3])
      );
    },
    lch: (out, src) => setC4(
      out || src,
      1 - src[0],
      src[1],
      fract(src[2] + 0.5),
      __ensureAlpha(src[3])
    ),
    rgb: invertRgb,
    ycc: (out, src) => setC4(
      out || src,
      1 - src[0],
      __invert1(src[1], -0.5, 0.5),
      __invert1(src[2], -0.5, 0.5),
      __ensureAlpha(src[3])
    )
  }
);
const __invert1 = (x, a, b) => fit(x, a, b, b, a);
export {
  invert,
  invertInt,
  invertRgb
};
