function* vecIterator(ctor, buf, num, start, cstride, estride) {
  while (num-- > 0) {
    yield new ctor(buf, start, cstride);
    start += estride;
  }
}
function* stridedValues(buf, num, start, stride) {
  while (num-- > 0) {
    yield buf[start];
    start += stride;
  }
}
export {
  stridedValues,
  vecIterator
};
