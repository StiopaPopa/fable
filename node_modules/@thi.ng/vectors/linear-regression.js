import { mag } from "./mag.js";
import { vmean } from "./mean.js";
import { mul } from "./mul.js";
import { subN } from "./subn.js";
import { sum } from "./sum.js";
import { sd } from "./variance.js";
const linReg = (a, b) => {
  const ma = vmean(a);
  const mb = vmean(b);
  a = subN([], a, ma);
  b = subN([], b, mb);
  const sda = sd(a, true);
  const sdb = sd(b, true);
  const m = mag(a) * mag(b);
  if (m === 0) return { ma, mb, sda, sdb, r: 0, slope: 0, y0: mb };
  const r = sum(mul(null, a, b)) / m;
  const slope = r * (sdb / sda);
  const y0 = mb - slope * ma;
  return { ma, mb, sda, sdb, r, slope, y0 };
};
export {
  linReg
};
