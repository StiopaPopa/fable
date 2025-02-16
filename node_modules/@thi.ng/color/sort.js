import { typedArray, typedArrayType } from "@thi.ng/api/typedarray";
import { quickSort } from "@thi.ng/arrays/quicksort";
import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { swap } from "@thi.ng/arrays/swap";
import { compareNumAsc, compareNumDesc } from "@thi.ng/compare/numeric";
import { distEucledian3 } from "./distance.js";
import { intAbgr32Srgb } from "./int/int-srgb.js";
const selectChannel = (id) => (col) => col[id];
const proximity = (target, dist = distEucledian3) => (col) => dist(target, col);
const proximityABGR32 = (target, dist = distEucledian3) => (col) => dist(target, intAbgr32Srgb([], col[0]));
const sort = (colors, key, isReverse = false) => sortByCachedKey(colors, key, isReverse ? compareNumDesc : compareNumAsc);
const sortMapped = (colors, key, isReverse = false) => {
  if (!colors.length) return colors;
  const keys = colors.map(key);
  const tmp = typedArray(typedArrayType(colors[0].buf), colors[0].length);
  quickSort(keys, isReverse ? compareNumDesc : compareNumAsc, (_, x, y) => {
    swap(keys, x, y);
    tmp.set(colors[x]);
    colors[x].set(colors[y]);
    colors[y].set(tmp);
  });
  return colors;
};
const mostSimilar = (colors, key) => sort(colors.slice(), key)[0];
export {
  mostSimilar,
  proximity,
  proximityABGR32,
  selectChannel,
  sort,
  sortMapped
};
