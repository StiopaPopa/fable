import { defColor } from "../defcolor.js";
import { oklabRgb } from "../oklab/oklab-rgb.js";
import { rgbOklab } from "../rgb/rgb-oklab.js";
import { oklabOklch } from "./oklab-oklch.js";
import { oklchOklab } from "./oklch-oklab.js";
const oklch = defColor({
  mode: "oklch",
  channels: {
    c: { range: [0, 0.3225] }
  },
  order: ["l", "c", "h", "alpha"],
  from: {
    oklab: oklabOklch,
    rgb: (out, src) => oklabOklch(null, rgbOklab(out, src))
  },
  toRgb: [oklchOklab, oklabRgb]
});
export {
  oklch
};
