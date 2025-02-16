import { setS2, setS3 } from "./sets.js";
const _rotate = (set, u, v) => (out, a, theta, io = 0, ia = 0, so = 1, sa = 1) => {
  out ? out !== a && set(out, a, io, ia, so, sa) : out = a;
  const s = Math.sin(theta);
  const c = Math.cos(theta);
  const x = a[ia + u * sa];
  const y = a[ia + v * sa];
  out[io + u * so] = x * c - y * s;
  out[io + v * so] = x * s + y * c;
  return out;
};
const rotateS2 = _rotate(setS2, 0, 1);
const rotateXS3 = _rotate(setS3, 1, 2);
const rotateYS3 = _rotate(setS3, 2, 0);
const rotateZS3 = _rotate(setS3, 0, 1);
export {
  rotateS2,
  rotateXS3,
  rotateYS3,
  rotateZS3
};
