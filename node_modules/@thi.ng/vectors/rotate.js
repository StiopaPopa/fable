import { set } from "./set.js";
const _rotate = (u, v) => (out, a, theta) => {
  out ? out !== a && set(out, a) : out = a;
  const s = Math.sin(theta);
  const c = Math.cos(theta);
  const x = a[u];
  const y = a[v];
  out[u] = x * c - y * s;
  out[v] = x * s + y * c;
  return out;
};
const rotateX = _rotate(1, 2);
const rotateY = _rotate(2, 0);
const rotateZ = _rotate(0, 1);
const rotate = rotateZ;
export {
  rotate,
  rotateX,
  rotateY,
  rotateZ
};
