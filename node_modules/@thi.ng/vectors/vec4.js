import { EPS } from "@thi.ng/math/api";
import {
  MAX4,
  MIN4,
  ONE4,
  X4,
  Y4,
  Z4,
  ZERO4
} from "./api.js";
import { AVec } from "./avec.js";
import { intoStridedBuffer, mapStridedBuffer } from "./buffer.js";
import { eqDelta4 } from "./eqdelta.js";
import { hash } from "./hash.js";
import { stridedValues, vecIterator } from "./iterator.js";
import { setS4 } from "./sets.js";
class Vec4 extends AVec {
  /**
   * Returns array of memory mapped {@link Vec4} instances using given
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
  static mapBuffer(buf, num = buf.length >> 2, start = 0, cstride = 1, estride = 4) {
    return mapStridedBuffer(Vec4, buf, num, start, cstride, estride);
  }
  /**
   * Merges given `src` iterable of {@link Vec4}s into single array `buf`.
   * Vectors will be arranged according to given component and element
   * strides, starting at `start` index. It's the user's
   * responsibility to ensure the target buffer has sufficient
   * capacity to hold the input vectors. See `Vec4.mapBuffer` for the
   * inverse operation. Returns `buf`.
   *
   * @param buf -
   * @param src -
   * @param start -
   * @param cstride -
   * @param estride -
   */
  static intoBuffer(buf, src, start = 0, cstride = 1, estride = 4) {
    return intoStridedBuffer(setS4, buf, src, start, cstride, estride);
  }
  static iterator(buf, num, start = 0, cstride = 1, estride = 4) {
    return vecIterator(Vec4, buf, num, start, cstride, estride);
  }
  static X_AXIS = new Vec4(X4);
  static Y_AXIS = new Vec4(Y4);
  static Z_AXIS = new Vec4(Z4);
  static MIN = new Vec4(MIN4);
  static MAX = new Vec4(MAX4);
  static ZERO = new Vec4(ZERO4);
  static ONE = new Vec4(ONE4);
  constructor(buf, offset = 0, stride = 1) {
    super(buf || [0, 0, 0, 0], offset, stride);
  }
  [Symbol.iterator]() {
    return stridedValues(this.buf, 4, this.offset, this.stride);
  }
  get length() {
    return 4;
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
  get [3]() {
    return this.buf[this.offset + 3 * this.stride];
  }
  set [3](w) {
    this.buf[this.offset + 3 * this.stride] = w;
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
  get w() {
    return this.buf[this.offset + 3 * this.stride];
  }
  set w(w) {
    this.buf[this.offset + 3 * this.stride] = w;
  }
  copy() {
    return new Vec4([this.x, this.y, this.z, this.w]);
  }
  copyView() {
    return new Vec4(this.buf, this.offset, this.stride);
  }
  empty() {
    return new Vec4();
  }
  eqDelta(v, eps = EPS) {
    return eqDelta4(this, v, eps);
  }
  hash() {
    return hash(this);
  }
  toJSON() {
    return [this.x, this.y, this.z, this.w];
  }
}
const vec4 = (x = 0, y = 0, z = 0, w = 0) => new Vec4([x, y, z, w]);
const vec4n = (n) => new Vec4([n, n, n, n]);
const asVec4 = (x) => x instanceof Vec4 ? x : new Vec4(
  x.length >= 4 ? x : [x[0] || 0, x[1] || 0, x[2] || 0, x[3] || 0]
);
export {
  Vec4,
  asVec4,
  vec4,
  vec4n
};
