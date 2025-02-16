import { peek } from "@thi.ng/arrays/peek";
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { fract } from "@thi.ng/math/prec";
import { coin } from "@thi.ng/random/coin";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { analog } from "./analog.js";
import { parseCss } from "./css/parse-css.js";
import { __ensureAlpha } from "./internal/ensure.js";
import { isBlack } from "./is-black.js";
import { isGray } from "./is-gray.js";
import { isWhite } from "./is-white.js";
import { lch } from "./lch/lch.js";
const COLOR_RANGES = {
  light: {
    c: [[0.3, 0.7]],
    l: [[0.9, 1]],
    b: [[0.35, 0.5]],
    w: [[0.6, 1]]
  },
  dark: {
    c: [[0.7, 1]],
    l: [[0.15, 0.4]],
    b: [[0, 0.4]],
    w: [[0.4, 0.6]]
  },
  bright: {
    c: [[0.75, 0.95]],
    l: [[0.8, 1]]
  },
  weak: {
    c: [[0.15, 0.3]],
    l: [[0.7, 1]],
    b: [[0.4, 0.6]],
    w: [[0.8, 1]]
  },
  neutral: {
    c: [[0.25, 0.35]],
    l: [[0.3, 0.7]],
    b: [[0.25, 0.4]],
    w: [[0.9, 1]]
  },
  fresh: {
    c: [[0.4, 0.8]],
    l: [[0.8, 1]],
    b: [[0.05, 0.3]],
    w: [[0.8, 1]]
  },
  soft: {
    c: [[0.2, 0.3]],
    l: [[0.6, 0.9]],
    b: [[0.05, 0.15]],
    w: [[0.6, 0.9]]
  },
  hard: {
    c: [[0.85, 0.95]],
    l: [[0.4, 1]]
  },
  warm: {
    c: [[0.6, 0.9]],
    l: [[0.4, 0.9]],
    b: [[0.2, 0.3]],
    w: [[0.8, 1]]
  },
  cool: {
    c: [[0.05, 0.2]],
    l: [[0.9, 1]],
    b: [[0, 0.95]],
    w: [[0.95, 1]]
  },
  intense: {
    c: [[0.9, 1]],
    l: [
      [0.2, 0.35],
      [0.8, 1]
    ]
  }
};
const FULL = [[0, 1]];
const DEFAULT_RANGE = {
  h: FULL,
  c: FULL,
  l: FULL,
  b: FULL,
  w: FULL,
  a: [[1, 1]]
};
const DEFAULT_OPTS = {
  num: Infinity,
  variance: 0.025,
  eps: 1e-3,
  rnd: SYSTEM
};
const $rnd = (ranges, rnd) => rnd.minmax(...ranges[rnd.int() % ranges.length]);
const colorFromRange = (range, opts) => {
  range = {
    ...DEFAULT_RANGE,
    ...isString(range) ? COLOR_RANGES[range] : range
  };
  const { base, variance, rnd, eps } = { ...DEFAULT_OPTS, ...opts };
  let h;
  let c;
  let l;
  let a;
  if (base) {
    const col = lch(base);
    h = col[2];
    a = __ensureAlpha(col[3]);
    if (isBlack(col, eps)) {
      c = 0;
      l = $rnd(range.b, rnd);
    } else if (isWhite(col, eps)) {
      c = 0;
      l = $rnd(range.w, rnd);
    } else if (isGray(col, eps)) {
      c = 0;
      l = $rnd(coin(rnd) ? range.b : range.w, rnd);
    } else {
      h = fract(h + rnd.norm(variance));
    }
  } else {
    h = $rnd(range.h, rnd);
    a = $rnd(range.a, rnd);
  }
  return lch([
    l != void 0 ? l : $rnd(range.l, rnd),
    c !== void 0 ? c : $rnd(range.c, rnd),
    h,
    a
  ]);
};
function* colorsFromRange(range, opts = {}) {
  let num = opts.num != void 0 ? opts.num : Infinity;
  while (num-- > 0) yield colorFromRange(range, opts);
}
const __compileThemePart = (part, opts) => {
  let spec;
  if (isArray(part)) {
    spec = __themePartFromTuple(part);
  } else if (isString(part)) {
    spec = __themePartFromString(part);
  } else {
    spec = { ...part };
    spec.weight == null && (spec.weight = 1);
  }
  isString(spec.range) && (spec.range = COLOR_RANGES[spec.range]);
  isString(spec.base) && (spec.base = lch(parseCss(spec.base)));
  if (spec.base !== void 0) {
    opts = { ...opts, base: spec.base };
  }
  return { spec, opts };
};
const __themePartFromTuple = (part) => {
  let weight;
  const [range, ...args] = part;
  if (isNumber(peek(args))) {
    weight = peek(args);
    args.pop();
  } else {
    weight = 1;
  }
  return args.length === 1 ? { range, base: args[0], weight } : args.length === 0 ? COLOR_RANGES[range] ? { range, weight } : { base: range, weight } : illegalArgs(`invalid theme part: "${part}"`);
};
const __themePartFromString = (part) => COLOR_RANGES[part] ? { range: part, weight: 1 } : { base: part, weight: 1 };
function* colorsFromTheme(parts, opts = {}) {
  let { num, variance, rnd } = { ...DEFAULT_OPTS, ...opts };
  const theme = parts.map((p) => __compileThemePart(p, opts));
  const choice = weightedRandom(
    theme,
    theme.map((x) => x.spec.weight),
    rnd
  );
  while (--num >= 0) {
    const { spec, opts: opts2 } = choice();
    if (spec.range) {
      yield colorFromRange(spec.range, opts2);
    } else if (spec.base) {
      yield analog(lch(), lch(spec.base), variance, rnd);
    }
  }
}
export {
  COLOR_RANGES,
  colorFromRange,
  colorsFromRange,
  colorsFromTheme
};
