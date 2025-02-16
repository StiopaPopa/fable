import { magSq } from "./magsq.js";
import { sub } from "./sub.js";
const rss = (a, b) => magSq(sub([], b, a));
const rssModel = (x, y, model) => {
  let err = 0;
  for (let i = 0, n = x.length; i < n; i++) err += (model(x[i]) - y[i]) ** 2;
  return err;
};
const rssLine = (x, y, y0, slope) => rssModel(x, y, (t) => y0 + slope * t);
export {
  rss,
  rssLine,
  rssModel
};
