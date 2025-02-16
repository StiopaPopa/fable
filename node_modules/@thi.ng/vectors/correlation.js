import { center } from "./center.js";
import { mag } from "./mag.js";
import { mul } from "./mul.js";
import { sum } from "./sum.js";
const correlation = (a, b) => {
  a = center([], a);
  b = center([], b);
  const m = mag(a) * mag(b);
  return m !== 0 ? sum(mul(null, a, b)) / m : void 0;
};
export {
  correlation
};
