import { defmulti } from "@thi.ng/defmulti/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { set4 } from "@thi.ng/vectors/set";
import { __dispatch1 } from "./internal/dispatch.js";
const $ = (id) => (out, src, n) => {
  out = set4(out || src, src);
  out[id] = clamp01(out[id] + n);
  return out;
};
const lighten = defmulti(
  __dispatch1,
  { hsv: "hsl", hsi: "hsl", hcy: "hsl" },
  {
    hsl: $(2),
    lch: $(0)
  }
);
export {
  lighten
};
