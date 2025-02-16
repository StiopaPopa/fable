import { assert } from "@thi.ng/errors/assert";
const __ensureInputs = (src) => assert(src.length > 0, `no inputs given`);
export {
  __ensureInputs
};
