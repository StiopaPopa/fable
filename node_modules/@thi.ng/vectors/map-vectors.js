import { isNumber } from "@thi.ng/checks/is-number";
function mapVectors(fn, out, a, b, c) {
  const num = a.length;
  !out && (out = new Array(num));
  c !== void 0 ? isNumber(c) ? __mapVVN(fn, out, a, b, c) : __mapVVV(fn, out, a, b, c) : isNumber(b) ? __mapVN(fn, out, a, b) : __mapVV(fn, out, a, b);
  return out;
}
const __mapVN = (fn, out, a, b) => {
  for (let i = 0, num = a.length; i < num; i++) {
    out[i] = fn(out[i] || [], a[i], b);
  }
};
const __mapVV = (fn, out, a, b) => {
  for (let i = 0, num = a.length; i < num; i++) {
    out[i] = fn(out[i] || [], a[i], b[i]);
  }
};
const __mapVVN = (fn, out, a, b, c) => {
  for (let i = 0, num = a.length; i < num; i++) {
    out[i] = fn(out[i] || [], a[i], b[i], c);
  }
};
const __mapVVV = (fn, out, a, b, c) => {
  for (let i = 0, num = a.length; i < num; i++) {
    out[i] = fn(out[i] || [], a[i], b[i], c[i]);
  }
};
export {
  mapVectors
};
