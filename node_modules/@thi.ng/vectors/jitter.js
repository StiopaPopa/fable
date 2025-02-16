import { SYSTEM } from "@thi.ng/random/system";
import { add } from "./add.js";
import { randNorm } from "./rand-norm.js";
const jitter = (out, a, n = 1, rnd = SYSTEM) => add(out, a, randNorm(new Array(a.length), n, rnd));
export {
  jitter
};
