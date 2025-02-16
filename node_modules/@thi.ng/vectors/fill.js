import { mapV } from "./map.js";
import { set } from "./set.js";
const fill = (out, v, num, so = out.length * out.stride) => mapV(set.impl(v.length), out, v, num, so, 0);
export {
  fill
};
