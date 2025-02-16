import { implementsFunction } from "@thi.ng/checks/implements-function";
import { zeroes } from "./setn.js";
const empty = (v) => implementsFunction(v, "empty") ? v.empty() : zeroes(v.length);
export {
  empty
};
