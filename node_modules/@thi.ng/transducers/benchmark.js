import { isIterable } from "@thi.ng/checks/is-iterable";
import { now, timeDiff } from "@thi.ng/timestamp";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";
function benchmark(src) {
  return isIterable(src) ? iterator1(benchmark(), src) : (rfn) => {
    const r = rfn[2];
    let prev = now();
    return compR(rfn, (acc, _) => {
      const t = now();
      const delta = timeDiff(prev, t);
      prev = t;
      return r(acc, delta);
    });
  };
}
export {
  benchmark
};
