import { hslCss } from "../hsl/hsl-css.js";
import { hsvHsl } from "./hsv-hsl.js";
const hsvCss = (src) => hslCss(hsvHsl([], src));
export {
  hsvCss
};
