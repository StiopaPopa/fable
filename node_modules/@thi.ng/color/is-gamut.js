import { inRange } from "@thi.ng/math/interval";
import { rgb } from "./rgb/rgb.js";
const isRgbGamut = (src, eps = 1e-3) => {
  const min = -eps;
  const max = 1 + eps;
  const col = src.mode === "rgb" || src.mode === "srgb" ? src : rgb(src);
  return inRange(col[0], min, max) && inRange(col[1], min, max) && inRange(col[2], min, max);
};
export {
  isRgbGamut
};
