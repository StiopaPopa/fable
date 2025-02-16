import { EPS } from "@thi.ng/math/api";
import {
  MAX3,
  MIN3,
  ONE3,
  X3,
  Y3,
  Z3,
  ZERO3
} from "./api.js";
import { AVec } from "./avec.js";
import { intoStridedBuffer, mapStridedBuffer } from "./buffer.js";
import { eqDelta3 } from "./eqdelta.js";
import { hash } from "./hash.js";
import { stridedValues, vecIterator } from "./iterator.js";
import { setS3 } from "./sets.js";
class Vec3 extends AVec {
  /**
   * Returns array of memory mapped {@link Vec3} instances using given
   * backing array and stride settings: The `cstride` is the step size
   * between individual XYZ vector components. `estride` is the step
   * size between successive vectors. This arrangement allows for
   * different storage approaches, incl. SOA, AOS, striped /
   * interleaved etc.
   *
   * @param buf - backing array
   * @param num - num vectors
   * @param start -  start index
   * @param cstride - component stride
   * @param estride - element stride
   */
  static mapBuffer(buf, num = buf.length / 3 | 0, start = 0, cstride = 1, estride = 3) {
    return mapStridedBuffer(Vec3, buf, num, start, cstride, estride);
  }
  /**
   * Merges given `src` iterable of {@link Vec3}s into single array `buf`.
   * Vectors will be arranged according to given component and element
   * strides, starting at `start` index. It's the user's
   * responsibility to ensure the target buffer has sufficient
   * capacity to hold the input vectors. See `Vec3.mapBuffer` for the
   * inverse operation. Returns `buf`.
   *
   * @param buf -
   * @param src -
   * @param start -
   * @param cstride -
   * @param estride -
   */
  static intoBuffer(buf, src, start = 0, cstride = 1, estride = 3) {
    return intoStridedBuffer(setS3, buf, src, start, cstride, estride);
  }
  static iterator(buf, num, start = 0, cstride = 1, estride = 3) {
    return vecIterator(Vec3, buf, num, start, cstride, estride);
  }
  static X_AXIS = new Vec3(X3);
  static Y_AXIS = new Vec3(Y3);
  static Z_AXIS = new Vec3(Z3);
  static MIN = new Vec3(MIN3);
  static MAX = new Vec3(MAX3);
  static ZERO = new Vec3(ZERO3);
  static ONE = new Vec3(ONE3);
  constructor(buf, offset = 0, stride = 1) {
    super(buf || [0, 0, 0], offset, stride);
  }
  [Symbol.iterator]() {
    return stridedValues(this.buf, 3, this.offset, this.stride);
  }
  get length() {
    return 3;
  }
  get [0]() {
    return this.buf[this.offset];
  }
  set [0](x) {
    this.buf[this.offset] = x;
  }
  get [1]() {
    return this.buf[this.offset + this.stride];
  }
  set [1](y) {
    this.buf[this.offset + this.stride] = y;
  }
  get [2]() {
    return this.buf[this.offset + 2 * this.stride];
  }
  set [2](z) {
    this.buf[this.offset + 2 * this.stride] = z;
  }
  get x() {
    return this.buf[this.offset];
  }
  set x(x) {
    this.buf[this.offset] = x;
  }
  get y() {
    return this.buf[this.offset + this.stride];
  }
  set y(y) {
    this.buf[this.offset + this.stride] = y;
  }
  get z() {
    return this.buf[this.offset + 2 * this.stride];
  }
  set z(z) {
    this.buf[this.offset + 2 * this.stride] = z;
  }
  copy() {
    return new Vec3([this.x, this.y, this.z]);
  }
  copyView() {
    return new Vec3(this.buf, this.offset, this.stride);
  }
  empty() {
    return new Vec3();
  }
  eqDelta(v, eps = EPS) {
    return eqDelta3(this, v, eps);
  }
  hash() {
    return hash(this);
  }
  toJSON() {
    return [this.x, this.y, this.z];
  }
}
const vec3 = (x = 0, y = 0, z = 0) => new Vec3([x, y, z]);
const vec3n = (n) => new Vec3([n, n, n]);
const asVec3 = (x) => x instanceof Vec3 ? x : new Vec3(
  x.length >= 3 ? x : [x[0] || 0, x[1] || 0, x[2] || 0]
);
export {
  Vec3,
  asVec3,
  vec3,
  vec3n
};
