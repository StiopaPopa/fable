function memoize(fn, cache) {
  return (...args) => {
    let res;
    return cache.has(args) ? cache.get(args) : (cache.set(args, res = fn.apply(null, args)), res);
  };
}
function memoizeAsync(fn, cache) {
  return async (...args) => {
    let res;
    return cache.has(args) ? cache.get(args) : (cache.set(args, res = await fn.apply(null, args)), res);
  };
}
export {
  memoize,
  memoizeAsync
};
