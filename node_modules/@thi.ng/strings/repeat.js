import { memoizeO } from "@thi.ng/memoize/memoizeo";
const repeat = memoizeO((ch, n) => ch.repeat(n));
export {
  repeat
};
