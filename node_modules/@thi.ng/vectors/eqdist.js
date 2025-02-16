import { EPS } from "@thi.ng/math/api";
const eqDist2 = ([ax, ay], [bx, by], eps = EPS) => (ax -= bx) * ax + (ay -= by) * ay <= eps * eps;
const eqDist3 = ([ax, ay, az], [bx, by, bz], eps = EPS) => (ax -= bx) * ax + (ay -= by) * ay + (az -= bz) * az <= eps * eps;
export {
  eqDist2,
  eqDist3
};
