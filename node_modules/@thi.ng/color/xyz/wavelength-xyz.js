import { setC4 } from "@thi.ng/vectors/setc";
import { xyzD65 } from "./xyz65.js";
const wavelengthXyz = (out, lambda, alpha = 1) => {
  lambda *= 10;
  return setC4(
    out || xyzD65(),
    __gaussian(lambda, 1.056, 5998, 379, 310) + __gaussian(lambda, 0.362, 4420, 160, 267) + __gaussian(lambda, -0.065, 5011, 204, 262),
    __gaussian(lambda, 0.821, 5688, 469, 405) + __gaussian(lambda, 0.286, 5309, 163, 311),
    __gaussian(lambda, 1.217, 4370, 118, 360) + __gaussian(lambda, 0.681, 4590, 260, 138),
    alpha
  );
};
const __gaussian = (x, alpha, m, s1, s2) => {
  const t = (x - m) / (x < m ? s1 : s2);
  return alpha * Math.exp(-(t * t) / 2);
};
export {
  wavelengthXyz
};
