const swatches = (cols, shapeFn, attribs = {}) => ["g", attribs, ...cols.map(shapeFn)];
const swatchesH = (cols, w = 5, h = 50, gap = 0, attribs) => swatches(
  cols,
  (fill, i) => ["rect", { fill }, [i * (w + gap), 0], w, h],
  attribs
);
const dotsH = (cols, r = 25, gap = 0, attribs) => swatches(
  cols,
  (fill, i) => ["circle", { fill }, [i * (r * 2 + gap), 0], r],
  attribs
);
const swatchesV = (cols, w = 50, h = 5, gap = 0, attribs = {}) => swatches(
  cols,
  (fill, i) => ["rect", { fill }, [0, i * (h + gap)], w, h],
  attribs
);
const dotsV = (cols, r = 25, gap = 0, attribs) => swatches(
  cols,
  (fill, i) => ["circle", { fill }, [0, i * (r * 2 + gap)], r],
  attribs
);
export {
  dotsH,
  dotsV,
  swatches,
  swatchesH,
  swatchesV
};
