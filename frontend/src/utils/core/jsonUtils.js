/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
export const isDate = (x) => {
  if (x instanceof Date) return true;
  if (typeof x === 'string') x = x.replaceAll(' ', '');
  return new Date(`${`${parseInt(-Math.abs(x), 10)}` !== 'NaN' ? `${x}padding` : x}`).toString() !== 'Invalid Date';
};

export const isObject = (x, checkEmpty = false) => {
  const isObj = !isDate(x) && typeof x === 'object' && !Array.isArray(x);
  return checkEmpty && isObj ? isObj && Object.keys(x).length : isObj;
};

export const convertJsonArr = (arr) => (
  arr.map((item) => (
    isDate(item) ? new Date(item) : item
  ))
);

export const convertJsonObj = (obj) => {
  const curKeys = Object.keys(obj);
  const curVals = convertJsonArr(Object.values(obj));
  const keyVals = [];
  for (let i = 0; i < curKeys.length; i += 1) {
    keyVals.push([curKeys[i], curVals[i]]);
  }
  return keyVals.reduce((acc, pair) => {
    acc[pair[0]] = pair[1];
    return acc;
  }, {});
};

export const toJson = (value) => (
  JSON.stringify(value)
);

export const parseJson = (value) => {
  const validTypes = ['number', 'string', 'boolean'];
  const val = JSON.parse(value);
  return Array.isArray(val)
    ? convertJsonArr(val)
    : validTypes.includes(typeof val)
      ? val : isDate(val)
        ? new Date(val)
        : convertJsonObj(val);
};
