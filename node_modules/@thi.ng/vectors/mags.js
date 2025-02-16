import { dotS, dotS2, dotS3, dotS4 } from "./dots.js";
const magS = (a, num, ia, sa) => Math.sqrt(dotS(a, a, num, ia, ia, sa, sa));
const magS2 = (a, ia, sa) => Math.sqrt(dotS2(a, a, ia, ia, sa, sa));
const magS3 = (a, ia, sa) => Math.sqrt(dotS3(a, a, ia, ia, sa, sa));
const magS4 = (a, ia, sa) => Math.sqrt(dotS4(a, a, ia, ia, sa, sa));
export {
  magS,
  magS2,
  magS3,
  magS4
};
