const upper = (x) => x.toUpperCase();
const lower = (x) => x.toLowerCase();
const capitalize = (x) => x.length ? x[0].toUpperCase() + x.substring(1) : x;
const kebab = (x, delim = "-") => lower(
  x.replace(
    /([a-z0-9\u00e0-\u00fd])([A-Z\u00c0-\u00dd])/g,
    (_, a, b) => a + delim + b
  )
);
const snake = (x) => kebab(x, "_");
const upperSnake = (x) => snake(x).toUpperCase();
const camel = (x, delim = "-") => lower(x).replace(new RegExp(`\\${delim}+(\\w)`, "g"), (_, c) => upper(c));
const pascal = (x, delim = "-") => capitalize(camel(x, delim));
export {
  camel,
  capitalize,
  kebab,
  lower,
  pascal,
  snake,
  upper,
  upperSnake
};
