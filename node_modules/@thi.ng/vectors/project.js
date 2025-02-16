import { dot } from "./dot.js";
import { magSq } from "./magsq.js";
import { mulN } from "./muln.js";
const project = (out, v, dir) => mulN(out || v, dir, dot(v, dir) / magSq(dir));
export {
  project
};
