import { isIterable } from "@thi.ng/checks/is-iterable";
import { now, timeDiff } from "@thi.ng/timestamp";
import { iterator } from "./iterator.js";
import { partitionBy } from "./partition-by.js";
function partitionTime(period, src) {
  return isIterable(src) ? iterator(partitionTime(period), src) : partitionBy(() => {
    let prev = 0;
    return () => {
      const t = now();
      timeDiff(prev, t) >= period && (prev = t);
      return prev;
    };
  }, true);
}
export {
  partitionTime
};
