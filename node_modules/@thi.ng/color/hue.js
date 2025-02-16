import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { hsv } from "./hsv/hsv.js";
import { __dispatch0 } from "./internal/dispatch.js";
const hue = defmulti(
  __dispatch0,
  {
    hcy: "hsv",
    hsi: "hsv",
    hsl: "hsv"
  },
  {
    [DEFAULT]: (col) => hsv(col)[0],
    hsv: (col) => col[0]
  }
);
export {
  hue
};
