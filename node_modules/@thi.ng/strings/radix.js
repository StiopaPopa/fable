import {
  U16 as $16,
  U24 as $24,
  U32 as $32,
  U8 as $8,
  U64HL
} from "@thi.ng/hex";
import { memoizeO } from "@thi.ng/memoize/memoizeo";
import { repeat } from "./repeat.js";
const radix = memoizeO(
  (radix2, n, prefix = "") => {
    const buf = repeat("0", n);
    return (x) => {
      x = (x >>> 0).toString(radix2);
      return prefix + (x.length < n ? buf.substring(x.length) + x : x);
    };
  }
);
const B8 = radix(2, 8);
const B16 = radix(2, 16);
const B32 = radix(2, 32);
const U8 = $8;
const U16 = $16;
const U24 = $24;
const U32 = $32;
const U64 = U64HL;
export {
  B16,
  B32,
  B8,
  U16,
  U24,
  U32,
  U64,
  U8,
  radix
};
