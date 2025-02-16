import { assert } from "@thi.ng/errors/assert";
import { SYSTEM } from "@thi.ng/random/system";
const shuffleRange = (buf, start = 0, end = buf.length, rnd = SYSTEM) => {
  assert(
    start >= 0 && end >= start && end <= buf.length,
    `illegal range ${start}..${end}`
  );
  while (end > start + 1) {
    const i = rnd.minmax(start, end) | 0;
    const t = buf[i];
    buf[i] = buf[--end];
    buf[end] = t;
  }
  return buf;
};
const shuffle = (buf, n = buf.length, rnd = SYSTEM) => shuffleRange(buf, 0, n, rnd);
export {
  shuffle,
  shuffleRange
};
