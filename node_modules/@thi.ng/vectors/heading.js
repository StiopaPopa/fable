import { atan2Abs } from "@thi.ng/math/angle";
const headingXY = (a) => atan2Abs(a[1], a[0]);
const headingXZ = (a) => atan2Abs(a[2], a[0]);
const headingYZ = (a) => atan2Abs(a[2], a[1]);
const heading = headingXY;
export {
  heading,
  headingXY,
  headingXZ,
  headingYZ
};
