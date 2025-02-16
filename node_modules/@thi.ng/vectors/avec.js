import { FORMATTER } from "./string.js";
class AVec {
  buf;
  offset;
  stride;
  constructor(buf, offset = 0, stride = 1) {
    this.buf = buf;
    this.offset = offset;
    this.stride = stride;
  }
  toString() {
    return FORMATTER(this);
  }
}
export {
  AVec
};
