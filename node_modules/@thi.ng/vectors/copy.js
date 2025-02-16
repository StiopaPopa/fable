import { implementsFunction } from "@thi.ng/checks/implements-function";
import { set } from "./set.js";
const copy = (v) => implementsFunction(v, "copy") ? v.copy() : set([], v);
const copyVectors = (pts) => pts.map(copy);
export {
  copy,
  copyVectors
};
