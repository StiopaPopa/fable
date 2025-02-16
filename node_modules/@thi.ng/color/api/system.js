let CSS_SYSTEM_COLORS = {
  canvas: "fff",
  canvastext: "000",
  linktext: "001ee4",
  visitedtext: "4e2386",
  activetext: "eb3323",
  buttonface: "ddd",
  buttontext: "000",
  buttonborder: "000",
  field: "fff",
  fieldtext: "000",
  highlight: "bbd5fb",
  highlighttext: "000",
  mark: "000",
  marktext: "fff",
  graytext: "808080"
};
const setSystemColors = (cols) => Object.assign(CSS_SYSTEM_COLORS, cols);
export {
  CSS_SYSTEM_COLORS,
  setSystemColors
};
