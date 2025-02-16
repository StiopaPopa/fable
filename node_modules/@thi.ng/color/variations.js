import { pickRandom } from "@thi.ng/random/pick-random";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { analog } from "./analog.js";
function* variations(src, opts) {
  opts = { rnd: SYSTEM, delta: 0.05, num: Infinity, ...opts };
  const pick = opts.weights ? weightedRandom(src, opts.weights, opts.rnd) : () => pickRandom(src, opts.rnd);
  for (let i = opts.num; i-- > 0; ) {
    const col = pick();
    yield analog(col.empty(), col, opts.delta, opts.rnd);
  }
}
export {
  variations
};
