import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { mix as $mix } from "@thi.ng/math/mix";
import { fract } from "@thi.ng/math/prec";
import { mixN4 } from "@thi.ng/vectors/mixn";
import { setC4 } from "@thi.ng/vectors/setc";
import { __dispatch1 } from "./internal/dispatch.js";
const defMix = (x, y, z, alpha) => (out, a, b, t) => setC4(
  out || a,
  x(a[0], b[0], t),
  y(a[1], b[1], t),
  z(a[2], b[2], t),
  alpha(a[3], b[3], t)
);
const mixH = (a, b, t) => {
  a = fract(a);
  b = fract(b);
  const delta = b - a;
  return fract(
    a + (Math.abs(delta) > 0.5 ? delta < 0 ? delta + 1 : -(1 - delta) : delta) * t
  );
};
const mixN = $mix;
const mixHNNN = defMix(mixH, mixN, mixN, mixN);
const mixNNHN = defMix(mixN, mixN, mixH, mixN);
const mixNNNN = mixN4;
const mix = defmulti(
  __dispatch1,
  {},
  {
    hcy: mixHNNN,
    hsi: mixHNNN,
    hsl: mixHNNN,
    hsv: mixHNNN,
    lch: mixNNHN,
    [DEFAULT]: mixN4
  }
);
export {
  defMix,
  mix,
  mixH,
  mixHNNN,
  mixN,
  mixNNHN,
  mixNNNN
};
