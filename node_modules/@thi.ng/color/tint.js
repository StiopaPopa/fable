import { defmulti } from "@thi.ng/defmulti/defmulti";
import { mix } from "@thi.ng/math/mix";
import { setC4 } from "@thi.ng/vectors";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";
const tint = defmulti(
  __dispatch1,
  { hcy: "hsv", hsi: "hsv", hsl: "hsv", oklch: "lch" },
  {
    hsv: (out, src, n, l = 1) => setC4(
      out || src,
      src[0],
      src[1] * (1 - n),
      mix(src[2], l, n),
      __ensureAlpha(src[3])
    ),
    lch: (out, src, n, l = 1) => setC4(
      out || src,
      mix(src[0], l, n),
      src[1] * (1 - n),
      src[2],
      __ensureAlpha(src[3])
    )
  }
);
const tone = (out, src, n) => tint(out, src, n, 0.5);
const shade = (out, src, n) => tint(out, src, n, 0);
export {
  shade,
  tint,
  tone
};
