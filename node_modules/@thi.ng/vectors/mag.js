import { magSq, magSq2, magSq3, magSq4 } from "./magsq.js";
const mag = (v) => Math.sqrt(magSq(v));
const mag2 = (v) => Math.sqrt(magSq2(v));
const mag3 = (v) => Math.sqrt(magSq3(v));
const mag4 = (v) => Math.sqrt(magSq4(v));
export {
  mag,
  mag2,
  mag3,
  mag4
};
