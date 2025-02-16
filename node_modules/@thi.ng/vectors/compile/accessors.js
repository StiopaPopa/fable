const declareIndex = (proto, id, idx, strided = true, defNumeric = true) => {
  const get = idx > 0 ? strided ? function() {
    return this.buf[this.offset + idx * this.stride];
  } : function() {
    return this.buf[this.offset + idx];
  } : function() {
    return this.buf[this.offset];
  };
  const set = idx > 0 ? strided ? function(n) {
    this.buf[this.offset + idx * this.stride] = n;
  } : function(n) {
    this.buf[this.offset + idx] = n;
  } : function(n) {
    this.buf[this.offset] = n;
  };
  defNumeric && Object.defineProperty(proto, idx, {
    get,
    set,
    enumerable: true
  });
  Object.defineProperty(proto, id, {
    get,
    set,
    enumerable: true
  });
};
const declareIndices = (proto, props, strided, defNumeric) => props.forEach((id, i) => declareIndex(proto, id, i, strided, defNumeric));
export {
  declareIndex,
  declareIndices
};
