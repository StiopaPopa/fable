import { setC2, setC3, setC4 } from "./setc.js";
const swizzle2 = (out, a, x, y) => setC2(out || a, a[x] || 0, a[y] || 0);
const swizzle3 = (out, a, x, y, z) => setC3(out || a, a[x] || 0, a[y] || 0, a[z] || 0);
const swizzle4 = (out, a, x, y, z, w) => setC4(out || a, a[x] || 0, a[y] || 0, a[z] || 0, a[w] || 0);
const swapXY = (out, v) => swizzle3(out, v, 1, 0, 2);
const swapXZ = (out, v) => swizzle3(out, v, 2, 1, 0);
const swapYZ = (out, v) => swizzle3(out, v, 0, 2, 1);
const setSwizzle1 = (out, n, a) => (out[a] = n, out);
const setSwizzle2 = (out, v, a, b) => (out[a] = v[0], out[b] = v[1], out);
const setSwizzle3 = (out, v, a, b, c) => (out[a] = v[0], out[b] = v[1], out[c] = v[2], out);
const setSwizzle4 = (out, v, a, b, c, d) => (out[a] = v[0], out[b] = v[1], out[c] = v[2], out[d] = v[3], out);
export {
  setSwizzle1,
  setSwizzle2,
  setSwizzle3,
  setSwizzle4,
  swapXY,
  swapXZ,
  swapYZ,
  swizzle2,
  swizzle3,
  swizzle4
};
