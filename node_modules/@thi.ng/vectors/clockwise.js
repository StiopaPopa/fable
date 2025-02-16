import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { signedArea2 } from "./signed-area.js";
const corner2 = (a, b, c, eps = EPS) => sign(signedArea2(a, b, c), eps);
const clockwise2 = (a, b, c, eps = EPS) => corner2(a, b, c, eps) < 0;
export {
  clockwise2,
  corner2
};
