/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */

// Checks to see if an input is a date object or is formatted as a date object.
const isDate = (x, checkExact = false) => {
  if (x instanceof Date) return true;
  if (typeof x === 'string') {
    if (checkExact) return false;
    x = x.replaceAll(' ', '')
  };
  return new Date(`${`${parseInt(-Math.abs(x), 10)}` !== 'NaN' ? `${x}padding` : x}`).toString() !== 'Invalid Date';
};

// Checks to see if something is an object.
const isObject = (x, checkEmpty = false) => {
  const isObj = x !== null && !isDate(x) && !Array.isArray(x) && typeof x === 'object';
  return (checkEmpty && isObj ? isObj && Object.keys(x).length : isObj) ? true : false;
};

// Converts values from an array that was parsed from a json string back to their original form.
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

// Converts values from an object that was parsed from a json string back to their original form.
const convertJsonObj = (obj) => {
  const curKeys = Object.keys(obj);
  const curVals = convertJsonArr(Object.values(obj));
  return curKeys.reduce((acc, key, i) => {
    acc[key] = curVals[i];
    return acc;
  }, {});
};

// Just stringifies an object.
const toJson = (value) => (
  JSON.stringify(value)
);

// Parses a json string into its original form. All values are set back to their original form.
const parseJson = (value) => {
  const val = JSON.parse(value);
  return Array.isArray(val)
    ? convertJsonArr(val)
    : isDate(val)
      ? new Date(val)
      : isObject(val)
        ? convertJsonObj(val)
        : val;
};

module.exports = {
  isDate,
  isObject,
  convertJsonArr,
  convertJsonObj,
  toJson,
  parseJson,
};
