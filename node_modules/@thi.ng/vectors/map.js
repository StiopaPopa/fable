const mapVV = (op, out, a, b, num, so = out.length * out.stride, sa = a.length * a.stride, sb = b.length * b.stride) => {
  while (num-- > 0) {
    op(out, a, b);
    out.offset += so;
    a.offset += sa;
    b.offset += sb;
  }
  return out.buf;
};
const mapV = (op, out, a, num, so = out.length * out.stride, sa = a.length * a.stride) => {
  while (num-- > 0) {
    op(out, a);
    out.offset += so;
    a.offset += sa;
  }
  return out.buf;
};
const mapVN = (op, out, a, n, num, so = out.length * out.stride, sa = a.length * a.stride) => {
  while (num-- > 0) {
    op(out, a, n);
    out.offset += so;
    a.offset += sa;
  }
  return out.buf;
};
const mapVVV = (op, out, a, b, c, num, so = out.length * out.stride, sa = a.length * a.stride, sb = b.length * b.stride, sc = c.length * c.stride) => {
  while (num-- > 0) {
    op(out, a, b, c);
    out.offset += so;
    a.offset += sa;
    b.offset += sb;
    c.offset += sc;
  }
  return out.buf;
};
const mapVVN = (op, out, a, b, n, num, so = out.length * out.stride, sa = a.length * a.stride, sb = b.length * b.stride) => {
  while (num-- > 0) {
    op(out, a, b, n);
    out.offset += so;
    a.offset += sa;
    b.offset += sb;
  }
  return out.buf;
};
export {
  mapV,
  mapVN,
  mapVV,
  mapVVN,
  mapVVV
};
