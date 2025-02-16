function memoizeJ(fn, cache = /* @__PURE__ */ Object.create(null)) {
  return (...args) => {
    const key = JSON.stringify(args);
    if (key !== void 0) {
      return key in cache ? cache[key] : cache[key] = fn.apply(null, args);
    }
    return fn.apply(null, args);
  };
}
function memoizeAsyncJ(fn, cache = /* @__PURE__ */ Object.create(null)) {
  return async (...args) => {
    const key = JSON.stringify(args);
    if (key !== void 0) {
      return key in cache ? cache[key] : cache[key] = await fn.apply(null, args);
    }
    return await fn.apply(null, args);
  };
}
export {
  memoizeAsyncJ,
  memoizeJ
};
