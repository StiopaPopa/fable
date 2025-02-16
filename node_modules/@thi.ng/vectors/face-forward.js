import { dot } from "./dot.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";
const faceForward = (out, n, i, nref) => {
  !out && (out = n);
  return dot(nref, i) < 0 ? out !== n ? set(out, n) : out : mulN(out, n, -1);
};
export {
  faceForward
};
