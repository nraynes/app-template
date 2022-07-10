import { isDate, isObject } from './jsonUtils';

const convertValue = (val, options) => (typeof val === 'function'
  ? 1
  : isDate(val)
    ? new Date(`${val}`).getTime()
    : typeof val === 'string'
      ? options && options.caseInsensitive
        ? val.trim().toLowerCase()
        : val.trim()
          : val)

export const compareObjects = (object1, object2, options = {}) => {
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
      if (!compareArrays(value1, value2)) return false;
    } else {
      const testValue1 = convertValue(value1, options);
      const testValue2 = convertValue(value2, options);
      if (testValue1 !== testValue2) return false;
    }
  }
  return true;
};

export const compareArrays = (arr1, arr2, options = {}) => {
  if (arr1.length !== arr2.length) return false;
  const a = [...arr1].sort();
  const b = [...arr2].sort();
  for (let i = 0; i < a.length; i++) {
    const curA = a[i];
    const curB = b[i];
    if (isObject(curA) && isObject(curB)) {
      if (!compareObjects(curA, curB)) return false;
    } else if (Array.isArray(curA) && Array.isArray(curB)) {
      if (!compareArrays(curA, curB)) return false;
    } else if (isDate(curA) && isDate(curB)) {
      if (`${curA}` !== `${curB}`) return false;
    } else if (curA !== curB) return false;
  }
  return true;
}
