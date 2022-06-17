export const omit = (object, keys) => (
  Object.keys(object).reduce((obj, key) => {
    if (!keys.includes(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {})
);
