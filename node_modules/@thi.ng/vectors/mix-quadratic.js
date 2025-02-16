import { addW3 } from "./addw.js";
const mixQuadratic = (out, a, b, c, t) => {
  const s = 1 - t;
  return addW3(out, a, b, c, s * s, 2 * s * t, t * t);
};
export {
  mixQuadratic
};
