/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
export const isDate = (x, checkExact = false) => {
  if (x instanceof Date) return true;
  if (typeof x === 'string') {
    if (checkExact) return false;
    x = x.replaceAll(' ', '')
  };
  return new Date(`${`${parseInt(-Math.abs(x), 10)}` !== 'NaN' ? `${x}padding` : x}`).toString() !== 'Invalid Date';
};

export const isObject = (x, checkEmpty = false) => {
  const isObj = x !== null && !isDate(x) && !Array.isArray(x) && typeof x === 'object';
  return (checkEmpty && isObj ? isObj && Object.keys(x).length : isObj) ? true : false;
};

export const convertJsonArr = (arr) => (
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

export const convertJsonObj = (obj) => {
  const curKeys = Object.keys(obj);
  const curVals = convertJsonArr(Object.values(obj));
  return curKeys.reduce((acc, key, i) => {
    acc[key] = curVals[i];
    return acc;
  }, {});
};

export const toJson = (value) => (
  JSON.stringify(value)
);

export const parseJson = (value) => {
  const val = JSON.parse(value);
  return Array.isArray(val)
    ? convertJsonArr(val)
    : isDate(val)
      ? new Date(val)
      : isObject(val)
        ? convertJsonObj(val)
        : val;
};
