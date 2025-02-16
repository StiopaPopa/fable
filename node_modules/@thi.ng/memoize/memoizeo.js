function memoizeO(fn, cache = /* @__PURE__ */ Object.create(null)) {
  return (...xs) => {
    const key = xs.join("-");
    return key in cache ? cache[key] : cache[key] = fn(...xs);
  };
}
function memoizeAsyncO(fn, cache = /* @__PURE__ */ Object.create(null)) {
  return async (...xs) => {
    const key = xs.join("-");
    return key in cache ? cache[key] : cache[key] = await fn(...xs);
  };
}
export {
  memoizeAsyncO,
  memoizeO
};
