import { EPS } from "@thi.ng/math/api";
import {
  MAX2,
  MIN2,
  ONE2,
  X2,
  Y2,
  ZERO2
} from "./api.js";
import { AVec } from "./avec.js";
import { intoStridedBuffer, mapStridedBuffer } from "./buffer.js";
import { eqDelta2 } from "./eqdelta.js";
import { hash } from "./hash.js";
import { stridedValues, vecIterator } from "./iterator.js";
import { setS2 } from "./sets.js";
class Vec2 extends AVec {
  /**
   * Returns array of memory mapped {@link Vec2} instances using given
   * backing array and stride settings: The `cstride` is the step size
   * between individual XY vector components. `estride` is the step
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
  static mapBuffer(buf, num = buf.length >> 1, start = 0, cstride = 1, estride = 2) {
    return mapStridedBuffer(Vec2, buf, num, start, cstride, estride);
  }
  /**
   * Merges given `src` iterable of {@link Vec2}s into single array `buf`.
   * Vectors will be arranged according to given component and element
   * strides, starting at `start` index. It's the user's
   * responsibility to ensure the target buffer has sufficient
   * capacity to hold the input vectors. See `Vec2.mapBuffer` for the
   * inverse operation. Returns `buf`.
   *
   * @param buf -
   * @param src -
   * @param start -
   * @param cstride -
   * @param estride -
   */
  static intoBuffer(buf, src, start = 0, cstride = 1, estride = 2) {
    return intoStridedBuffer(setS2, buf, src, start, cstride, estride);
  }
  static iterator(buf, num, start = 0, cstride = 1, estride = 2) {
    return vecIterator(Vec2, buf, num, start, cstride, estride);
  }
  static X_AXIS = new Vec2(X2);
  static Y_AXIS = new Vec2(Y2);
  static MIN = new Vec2(MIN2);
  static MAX = new Vec2(MAX2);
  static ZERO = new Vec2(ZERO2);
  static ONE = new Vec2(ONE2);
  constructor(buf, offset = 0, stride = 1) {
    super(buf || [0, 0], offset, stride);
  }
  [Symbol.iterator]() {
    return stridedValues(this.buf, 2, this.offset, this.stride);
  }
  get length() {
    return 2;
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
  copy() {
    return new Vec2([this.x, this.y]);
  }
  copyView() {
    return new Vec2(this.buf, this.offset, this.stride);
  }
  empty() {
    return new Vec2();
  }
  eqDelta(v, eps = EPS) {
    return eqDelta2(this, v, eps);
  }
  hash() {
    return hash(this);
  }
  toJSON() {
    return [this.x, this.y];
  }
}
const vec2 = (x = 0, y = 0) => new Vec2([x, y]);
const vec2n = (n) => new Vec2([n, n]);
const asVec2 = (x) => x instanceof Vec2 ? x : new Vec2(x.length >= 2 ? x : [x[0] || 0, x[1] || 0]);
export {
  Vec2,
  asVec2,
  vec2,
  vec2n
};
