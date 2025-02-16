import { addmN } from "./addmn.js";
import { addW4 } from "./addw.js";
import { submN } from "./submn.js";
const mixCubicHermite = (out, a, ta, b, tb, t) => {
  const s = t - 1;
  const t2 = t * t;
  const s2 = s * s;
  return addW4(
    out,
    a,
    ta,
    b,
    tb,
    (1 + 2 * t) * s2,
    t * s2,
    t2 * (3 - 2 * t),
    t2 * s
  );
};
const mixHermiteCardinal = (out, a, b, c, d, t, scale = 0.5) => mixCubicHermite(
  out,
  b,
  tangentCardinal([], a, c, scale),
  c,
  tangentCardinal([], b, d, scale),
  t
);
const mixHermiteDiff3 = (out, a, b, c, d, t) => mixCubicHermite(
  out,
  b,
  tangentDiff3([], a, b, c),
  c,
  tangentDiff3([], b, c, d),
  t
);
const tangentCardinal = (out, prev, next, scale = 0.5, ta = 0, tc = 2) => submN(out, next, prev, scale / (tc - ta));
const tangentDiff3 = (out, prev, curr, next, ta = 0, tb = 1, tc = 2) => addmN(
  out,
  submN(out, curr, prev, 1 / (tb - ta)),
  submN([], next, curr, 1 / (tc - tb)),
  0.5
);
export {
  mixCubicHermite,
  mixHermiteCardinal,
  mixHermiteDiff3,
  tangentCardinal,
  tangentDiff3
};
