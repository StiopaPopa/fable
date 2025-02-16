import { center } from "./center.js";
import { mul } from "./mul.js";
import { sum } from "./sum.js";
const covariance = (a, b) => sum(mul(null, center([], a), center([], b))) / (a.length - 1);
export {
  covariance
};
