const { isDate, isObject } = require('./jsonUtils');

const convertValue = (val, options) => (typeof val === 'function'
  ? 1
  : isDate(val)
    ? new Date(`${val}`).getTime()
    : typeof val === 'string'
      ? options && options.caseInsensitive
        ? val.trim().toLowerCase()
        : val.trim()
          : val)

const compareObjects = (object1, object2, options = {}) => {
  if (!object1
    || !object2
    || !isObject(object1)
    || !isObject(object2)
    || ((options && options.totalEquality) && Object.keys(object1).length !== Object.keys(object2).length)
  ) return false;
  const object1Keys = Object.keys(object1);
  for (let i = 0; i < object1Keys.length; i++) {
    let value1 = object1[object1Keys[i]];
    let value2 = object2[object1Keys[i]];
    if (value2 === undefined && value1 !== undefined) return false;
    if (isObject(value1)) {
      if (!compareObjects(value1, value2, options)) return false;
    } else if (Array.isArray(value1)) {
      if (!compareArrays(value1, value2, options)) return false;
    } else {
      const testValue1 = convertValue(value1, options);
      const testValue2 = convertValue(value2, options);
      if (testValue1 !== testValue2) return false;
    }
  }
  return true;
};

const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const a = [...arr1].sort();
  const b = [...arr2].sort();
  for (let i = 0; i < a.length; i += 1) {
    if (isObject(a[i]) && isObject(b[i])) {
      if (!compareObjects(a[i], b[i])) return false;
    } else if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!compareArrays(a[i], b[i])) return false;
    } else if (isDate(a[i]) && isDate(b[i])) {
      if (`${a[i]}` !== `${b[i]}`) return false;
    } else if (a[i] !== b[i]) return false;
  }
  return true;
}

const compareValues = (val1, val2, options = {}) => {
  if (!val1 || !val2) return false;
  if (isObject(val1) && isObject(val2)) return compareObjects(val1, val2, options);
  if (Array.isArray(val1) && Array.isArray(val2)) return compareArrays(val1, val2, options);
  const value1 = convertValue(val1, options)
  const value2 = convertValue(val2, options)
  return value1 === value2;
}

module.exports = {
  compareArrays,
  compareObjects,
  compareValues,
};
