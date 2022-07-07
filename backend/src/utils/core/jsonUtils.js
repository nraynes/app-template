/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
const isDate = (x, checkExact = false) => {
  if (x instanceof Date) return true;
  if (typeof x === 'string') {
    if (checkExact) return false;
    x = x.replaceAll(' ', '')
  };
  return new Date(`${`${parseInt(-Math.abs(x), 10)}` !== 'NaN' ? `${x}padding` : x}`).toString() !== 'Invalid Date';
};

const isObject = (x, checkEmpty = false) => {
  const isObj = !isDate(x) && typeof x === 'object' && !Array.isArray(x);
  return (checkEmpty && isObj ? isObj && Object.keys(x).length : isObj) ? true : false;
};

const convertJsonArr = (arr) => (
  arr.map((item) => (
    isDate(item)
      ? new Date(item)
      : Array.isArray(item)
        ? convertJsonArr(item)
        : isObject(item, true)
          ? convertJsonObj(item)
          : item
  ))
);

const convertJsonObj = (obj) => {
  const curKeys = Object.keys(obj);
  const curVals = convertJsonArr(Object.values(obj));
  return curKeys.reduce((acc, key, i) => {
    acc[key] = curVals[i];
    return acc;
  }, {});
};

const toJson = (value) => (
  JSON.stringify(value)
);

const parseJson = (value) => {
  const validTypes = ['number', 'string', 'boolean'];
  const val = JSON.parse(value);
  return Array.isArray(val)
    ? convertJsonArr(val)
    : validTypes.includes(typeof val)
      ? val : isDate(val)
        ? new Date(val)
        : convertJsonObj(val);
};

module.exports = {
  isDate,
  isObject,
  convertJsonArr,
  convertJsonObj,
  toJson,
  parseJson,
};
