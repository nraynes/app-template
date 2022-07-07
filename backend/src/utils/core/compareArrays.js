const { isObject, isDate } = require('./jsonUtils');
const compareObjects = require('./compareObjects');

function compareArrays(arr1, arr2) {
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

module.exports = compareArrays;
