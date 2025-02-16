import { fract } from "@thi.ng/math/prec";
const closestHue = (h) => Math.round(fract(h) * 12) % 12;
const closestPrimaryHue = (h) => closestHue(h) & 14;
export {
  closestHue,
  closestPrimaryHue
};
