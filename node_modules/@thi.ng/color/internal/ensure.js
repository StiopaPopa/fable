import { clamp01 } from "@thi.ng/math/interval";
const __ensureAlpha = (x, def = 1) => x != void 0 ? clamp01(x) : def;
const __ensureArgs = (args) => {
  if (typeof args[0] === "number") {
    switch (args.length) {
      case 1:
        return args.push(0, 0, 1), [args];
      case 2:
        return args.push(0, 1), [args];
      case 3:
        return args.push(1), [args];
      default:
        return [args];
    }
  }
  return args;
};
export {
  __ensureAlpha,
  __ensureArgs
};
