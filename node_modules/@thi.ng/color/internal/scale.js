const __scale8bit = (x, shift = 0) => (x < 0 ? 0 : x > 1 ? 1 : x) * 255 + 0.5 << shift;
export {
  __scale8bit
};
