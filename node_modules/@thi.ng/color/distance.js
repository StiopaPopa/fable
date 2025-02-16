import { atan2Abs, cossin } from "@thi.ng/math/angle";
import { DEG2RAD, PI, SIXTH_PI, TAU, THIRD_PI } from "@thi.ng/math/api";
import { ONE3 } from "@thi.ng/vectors/api";
import { dist3, dist4 } from "@thi.ng/vectors/dist";
import { labD50 } from "./lab/lab50.js";
import { labD65 } from "./lab/lab65.js";
import { luminanceRgb, luminanceSrgb } from "./luminance-rgb.js";
const { abs, cos, hypot, sin, sqrt } = Math;
const distChannel = (id) => (a, b) => abs(a[id] - b[id]);
const distHsv = (a, b) => {
  const aa = cossin(a[0] * TAU, a[1]);
  const bb = cossin(b[0] * TAU, b[1]);
  return hypot(aa[0] - bb[0], aa[1] - bb[1], a[2] - b[2]);
};
const distLch = ({ 0: la, 1: ca, 2: ha }, { 0: lb, 1: cb, 2: hb }) => Math.sqrt(
  ca * ca + cb * cb - 2 * ca * cb * Math.cos((ha - hb) * TAU) + (la - lb) ** 2
);
const distHsvSat = distChannel(1);
const distHsvLuma = distChannel(2);
const distEucledian3 = dist3;
const distEucledian4 = dist4;
const distRgbLuma = (a, b) => abs(luminanceRgb(a) - luminanceRgb(b));
const distSrgbLuma = (a, b) => abs(luminanceSrgb(a) - luminanceSrgb(b));
const distRgbRed = distChannel(0);
const distRgbGreen = distChannel(1);
const distRgbBlue = distChannel(1);
const H6 = 6 * DEG2RAD;
const H25 = 25 * DEG2RAD;
const H63 = 63 * DEG2RAD;
const H275 = 275 * DEG2RAD;
const distCIEDE2000 = (weights = ONE3) => (a, b) => {
  let { 0: l1, 1: a1, 2: b1 } = labD50(a);
  let { 0: l2, 1: a2, 2: b2 } = labD50(b);
  l1 *= 100;
  a1 *= 100;
  b1 *= 100;
  l2 *= 100;
  a2 *= 100;
  b2 *= 100;
  const c1ab = hypot(a1, b1);
  const c2ab = hypot(a2, b2);
  const cab = (c1ab + c2ab) * 0.5;
  const g = 1 + 0.5 * (1 - __c7Coeff(cab));
  a1 *= g;
  a2 *= g;
  const c1 = hypot(a1, b1);
  const c2 = hypot(a2, b2);
  const cmean = (c1 + c2) * 0.5;
  const { deltaH, H } = __computeDeltaH(a1, b1, a2, b2, c1, c2);
  const T = 1 - 0.17 * cos(H - SIXTH_PI) + 0.24 * cos(2 * H) + 0.32 * cos(3 * H + H6) - 0.2 * cos(4 * H - H63);
  const Rt = -2 * __c7Coeff(cmean) * sin(THIRD_PI * Math.exp(-(((H - H275) / H25) ** 2)));
  const L50 = ((l1 + l2) * 0.5 - 50) ** 2;
  const Sl = 1 + 0.015 * L50 / sqrt(20 + L50);
  const Sc = 1 + 0.045 * cmean;
  const Sh = 1 + 0.015 * cmean * T;
  const termL = (l2 - l1) / (weights[0] * Sl);
  const termC = (c2 - c1) / (weights[1] * Sc);
  const termH = deltaH / (weights[2] * Sh);
  return sqrt(termL ** 2 + termC ** 2 + termH ** 2 + Rt * termC * termH);
};
const __c7Coeff = (c) => {
  c = c ** 7;
  return sqrt(c / (c + 25 ** 7));
};
const __computeDeltaH = (a1, b1, a2, b2, c1, c2, eps = 1e-3) => {
  const h1 = atan2Abs(b1, a1);
  const h2 = atan2Abs(b2, a2);
  if (c1 <= eps || c2 <= eps) return { deltaH: 0, H: h1 + h2 };
  let dh = h2 - h1;
  const sumH = h1 + h2;
  const absH = abs(dh);
  dh = absH <= PI ? dh : h2 <= h1 ? dh + TAU : dh - TAU;
  const deltaH = 2 * sqrt(c1 * c2) * sin(dh / 2);
  const H = 0.5 * (absH <= PI ? sumH : sumH < TAU ? sumH + TAU : sumH - TAU);
  return { deltaH, H };
};
const H35 = 35 * DEG2RAD;
const H164 = 164 * DEG2RAD;
const H168 = 168 * DEG2RAD;
const H345 = 345 * DEG2RAD;
const distCMC = (kl = 1, kc = 1) => (a, b) => {
  let { 0: l1, 1: a1, 2: b1 } = labD65(a);
  let { 0: l2, 1: a2, 2: b2 } = labD65(b);
  l1 *= 100;
  a1 *= 100;
  b1 *= 100;
  l2 *= 100;
  a2 *= 100;
  b2 *= 100;
  const c1 = hypot(a1, b1);
  const c2 = hypot(a2, b2);
  const dC = c1 - c2;
  const dH = sqrt((a2 - a1) ** 2 + (b2 - b1) ** 2 - dC ** 2);
  const h1 = atan2Abs(b1, a1);
  const t = h1 >= H164 && h1 <= H345 ? 0.56 + abs(0.2 * cos(h1 + H168)) : 0.36 + abs(0.4 * cos(h1 + H35));
  const c14 = c1 ** 4;
  const f = sqrt(c14 / (c14 + 1900));
  const Sl = l1 >= 16 ? 0.040975 * l1 / (1 + 0.01765 * l1) : 0.511;
  const Sc = 0.0638 * c1 / (1 + 0.0131 * c1) + 0.638;
  const Sh = Sc * (f * t + 1 - f);
  return hypot((l1 - l2) / (kl * Sl), dC / (kc * Sc), dH / Sh);
};
export {
  distCIEDE2000,
  distCMC,
  distChannel,
  distEucledian3,
  distEucledian4,
  distHsv,
  distHsvLuma,
  distHsvSat,
  distLch,
  distRgbBlue,
  distRgbGreen,
  distRgbLuma,
  distRgbRed,
  distSrgbLuma
};
