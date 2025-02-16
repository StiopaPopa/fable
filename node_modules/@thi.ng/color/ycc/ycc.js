import { defColor } from "../defcolor.js";
import { rgbYcc } from "../rgb/rgb-ycc.js";
import { yccRgb } from "./ycc-rgb.js";
const ycc = defColor({
  mode: "ycc",
  channels: {
    cb: { range: [-0.5, 0.5] },
    cr: { range: [-0.5, 0.5] }
  },
  order: ["y", "cb", "cr", "alpha"],
  from: { rgb: rgbYcc },
  toRgb: yccRgb
});
export {
  ycc
};
