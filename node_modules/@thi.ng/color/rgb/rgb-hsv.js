import { EPS } from "@thi.ng/math/api";
import { rgbHcv } from "./rgb-hcv.js";
const rgbHsv = (out, src) => {
  out = rgbHcv(out, src);
  out[1] /= out[2] + EPS;
  return out;
};
export {
  rgbHsv
};
