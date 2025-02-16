import { atan2Abs } from "@thi.ng/math/angle";
const $ = (u, v) => (a, b) => atan2Abs(b[u] - a[u], b[v] - a[v]);
const headingSegmentXY = $(1, 0);
const headingSegmentXZ = $(2, 0);
const headingSegmentYZ = $(2, 1);
const headingSegment = headingSegmentXY;
export {
  headingSegment,
  headingSegmentXY,
  headingSegmentXZ,
  headingSegmentYZ
};
