import { distSq, distSq2, distSq3, distSq4 } from "./distsq.js";
const dist = (a, b) => Math.sqrt(distSq(a, b));
const dist2 = (a, b) => Math.sqrt(distSq2(a, b));
const dist3 = (a, b) => Math.sqrt(distSq3(a, b));
const dist4 = (a, b) => Math.sqrt(distSq4(a, b));
export {
  dist,
  dist2,
  dist3,
  dist4
};
