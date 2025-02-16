import { isString } from "@thi.ng/checks/is-string";
import { parseCss } from "./css/parse-css.js";
import { hcy } from "./hcy/hcy.js";
import { hsi } from "./hsi/hsi.js";
import { hsl } from "./hsl/hsl.js";
import { hsv } from "./hsv/hsv.js";
import { argb32, abgr32 } from "./int/int.js";
import { labD50 } from "./lab/lab50.js";
import { labD65 } from "./lab/lab65.js";
import { lch } from "./lch/lch.js";
import { oklab } from "./oklab/oklab.js";
import { oklch } from "./oklch/oklch.js";
import { rgb } from "./rgb/rgb.js";
import { srgb } from "./srgb/srgb.js";
import { xyy } from "./xyy/xyy.js";
import { xyzD50 } from "./xyz/xyz50.js";
import { xyzD65 } from "./xyz/xyz65.js";
import { ycc } from "./ycc/ycc.js";
const FACTORIES = {
  argb32,
  abgr32,
  hcy,
  hsi,
  hsl,
  hsv,
  lab50: labD50,
  lab65: labD65,
  lch,
  oklab,
  oklch,
  rgb,
  srgb,
  xyy,
  xyz50: xyzD50,
  xyz65: xyzD65,
  ycc
};
function color(src, buf, idx, stride) {
  if (isString(src))
    return buf ? FACTORIES[src](buf, idx, stride) : color(parseCss(src));
  if (buf) {
    const res = FACTORIES[src.mode](buf, idx, stride);
    res.set(src.deref());
    return res;
  }
  return FACTORIES[src.mode](src.deref());
}
export {
  color
};
