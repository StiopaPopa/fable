import { vmean } from "./mean.js";
import { subN } from "./subn.js";
const center = (out, a) => subN(out, a, vmean(a));
export {
  center
};
