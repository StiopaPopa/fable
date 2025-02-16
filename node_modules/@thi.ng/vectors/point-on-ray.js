import { maddN, maddN2, maddN3 } from "./maddn.js";
const pointOnRay = (out, rayOrigin, rayDir, dist) => maddN(out, rayDir, dist, rayOrigin);
const pointOnRay2 = (out, rayOrigin, rayDir, dist) => maddN2(out, rayDir, dist, rayOrigin);
const pointOnRay3 = (out, rayOrigin, rayDir, dist) => maddN3(out, rayDir, dist, rayOrigin);
export {
  pointOnRay,
  pointOnRay2,
  pointOnRay3
};
