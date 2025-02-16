import { setC4 } from "@thi.ng/vectors/setc";
const alpha = (src) => src[3] !== void 0 ? src[3] : 1;
const setAlpha = (out, src, alpha2) => setC4(out || src, src[0], src[1], src[2], alpha2);
export {
  alpha,
  setAlpha
};
