import { setC3, setC4 } from "./setc.js";
const setVN3 = (out, a, n) => setC3(out, a[0], a[1], n);
const setVN4 = (out, a, n) => setC4(out, a[0], a[1], a[2], n);
export {
  setVN3,
  setVN4
};
