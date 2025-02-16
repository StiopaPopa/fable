import { defColor } from "../defcolor.js";
import { rgbXyzD65 } from "../rgb/rgb-xyz.js";
import { xyzRgbD65 } from "../xyz/xyz-rgb.js";
import { xyzXyy } from "../xyz/xyz-xyy.js";
import { xyyXyz } from "./xyy-xyz.js";
const xyy = defColor({
  mode: "xyy",
  channels: {
    x: { range: [0, 0.6484] },
    y: { range: [0, 0.5979] }
  },
  order: ["x", "y", "Y", "alpha"],
  from: {
    rgb: (out, src) => xyzXyy(null, rgbXyzD65(out, src)),
    xyz50: xyzXyy,
    xyz65: xyzXyy
  },
  toRgb: [xyyXyz, xyzRgbD65]
});
export {
  xyy
};
