import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { SYSTEM } from "@thi.ng/random/system";
import { setC4 } from "@thi.ng/vectors/setc";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";
const __analogU = (x, delta, rnd) => delta !== 0 ? x + rnd.norm(delta) : x;
const __analogN = (x, delta, rnd, post = clamp01) => delta !== 0 ? post(x + rnd.norm(delta)) : x;
const __analogH = (x, delta, rnd) => __analogN(x, delta, rnd, fract);
const __analogA = (a, delta, rnd) => delta !== 0 ? clamp01((a !== void 0 ? a : 1) + rnd.norm(delta)) : __ensureAlpha(a);
const defAnalog = (x, y, z) => (out, src, delta, rnd = SYSTEM) => setC4(
  out || src,
  x(src[0], delta, rnd),
  y(src[1], delta, rnd),
  z(src[2], delta, rnd),
  __ensureAlpha(src[3])
);
const __analogHNN = defAnalog(__analogH, __analogN, __analogN);
const __analogNNN = defAnalog(__analogN, __analogN, __analogN);
const __analogNUU = defAnalog(__analogN, __analogU, __analogU);
const analog = defmulti(
  __dispatch1,
  { oklab: "lab50", oklch: "lch" },
  {
    hcy: __analogHNN,
    hsi: __analogHNN,
    hsl: __analogHNN,
    hsv: __analogHNN,
    lab50: __analogNUU,
    lab65: __analogNUU,
    lch: defAnalog(__analogN, __analogN, __analogH),
    ycc: __analogNUU,
    [DEFAULT]: __analogNNN
  }
);
const analogHsv = (out, src, deltaH, deltaS = 0, deltaV = 0, deltaA = 0, rnd = SYSTEM) => setC4(
  out || src,
  __analogN(src[0], deltaH, rnd, fract),
  __analogN(src[1], deltaS, rnd),
  __analogN(src[2], deltaV, rnd),
  __analogA(src[3], deltaA, rnd)
);
const analogRgb = (out, src, deltaR, deltaG = deltaR, deltaB = deltaR, deltaA = 0, rnd = SYSTEM) => setC4(
  out || src,
  __analogN(src[0], deltaR, rnd),
  __analogN(src[1], deltaG, rnd),
  __analogN(src[2], deltaB, rnd),
  __analogA(src[3], deltaA, rnd)
);
export {
  analog,
  analogHsv,
  analogRgb,
  defAnalog
};
