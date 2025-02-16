import { maddN } from "./maddn.js";
import { mulN } from "./muln.js";
const addW2 = (out, a, b, wa, wb) => (!out && (out = a), maddN(out, b, wb, mulN(out, a, wa)));
const addW3 = (out, a, b, c, wa, wb, wc) => (!out && (out = a), maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa))));
const addW4 = (out, a, b, c, d, wa, wb, wc, wd) => (!out && (out = a), maddN(out, d, wd, maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa)))));
const addW5 = (out, a, b, c, d, e, wa, wb, wc, wd, we) => (!out && (out = a), maddN(
  out,
  e,
  we,
  maddN(
    out,
    d,
    wd,
    maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa)))
  )
));
export {
  addW2,
  addW3,
  addW4,
  addW5
};
