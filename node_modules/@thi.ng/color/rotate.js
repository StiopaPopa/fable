import { defmulti } from "@thi.ng/defmulti/defmulti";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";
const rotate = defmulti(
  __dispatch1,
  { hcy: "hsl", hsi: "hsl", hsv: "hsl", oklch: "lch" },
  {
    hsl: (out, src, theta) => setC4(
      out || src,
      fract(src[0] + theta),
      src[1],
      src[2],
      __ensureAlpha(src[3])
    ),
    lch: (out, src, theta) => setC4(
      out || src,
      src[0],
      src[1],
      fract(src[2] + theta),
      __ensureAlpha(src[3])
    )
  }
);
const complementary = (out, src) => rotate(out, src, 0.5);
export {
  complementary,
  rotate
};
