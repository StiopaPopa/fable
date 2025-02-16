import { mul } from "./mul.js";
const weightedDistance = (fn, weights) => (a, b) => fn(mul([], a, weights), mul([], b, weights));
export {
  weightedDistance
};
