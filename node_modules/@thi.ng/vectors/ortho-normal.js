import { cross3 } from "./cross.js";
import { normalize3 } from "./normalize.js";
import { sub3 } from "./sub.js";
const orthoNormal3 = (out, a, b, c, doNormalize = true) => {
  out = cross3(null, sub3(out || a, b, a), sub3([], c, a));
  return doNormalize ? normalize3(out, out) : out;
};
export {
  orthoNormal3
};
