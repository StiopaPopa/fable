import { clamp01 } from "@thi.ng/math/interval";
import { __ensureAlpha } from "../internal/ensure.js";
const srgbIntArgb32 = (src) => (__ensureAlpha(src[3]) * 255 + 0.5 << 24 | clamp01(src[0]) * 255 + 0.5 << 16 | clamp01(src[1]) * 255 + 0.5 << 8 | clamp01(src[2]) * 255 + 0.5) >>> 0;
const srgbIntAbgr32 = (src) => (__ensureAlpha(src[3]) * 255 + 0.5 << 24 | clamp01(src[2]) * 255 + 0.5 << 16 | clamp01(src[1]) * 255 + 0.5 << 8 | clamp01(src[0]) * 255 + 0.5) >>> 0;
export {
  srgbIntAbgr32,
  srgbIntArgb32
};
