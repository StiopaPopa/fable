import { luminanceRgb } from "./luminance-rgb.js";
import { rgb } from "./rgb/rgb.js";
const contrast = (a, b) => {
  const lumA = luminanceRgb(rgb(a)) + 0.05;
  const lumB = luminanceRgb(rgb(b)) + 0.05;
  return lumA > lumB ? lumA / lumB : lumB / lumA;
};
export {
  contrast
};
