/**
 * Checks to see if an input is a date object or is formatted as a date object.
 * @param {Any} val
 * @param {Boolean} checkExact
 * @returns {Boolean}
 */
export const isDate = (val, checkExact = false) => {
  if (val instanceof Date) return true;
  if (typeof val === 'string') {
    if (checkExact) return false;
    val = val.replaceAll(' ', '');
  }
  return new Date(`${`${parseInt(-Math.abs(val), 10)}` !== 'NaN' ? `${val}padding` : val}`).toString() !== 'Invalid Date';
};

/**
 * Checks to see if something is an object.
 * @param {Any} val
 * @param {Boolean} checkEmpty
 * @returns {Object}
 */
export const isObject = (val, checkEmpty = false) => {
  const isObj = val !== null && !isDate(val) && !Array.isArray(val) && typeof val === 'object';
  return (checkEmpty && isObj ? isObj && Object.keys(val).length : isObj) ? true : false;
};

/**
 * Converts values from an array that was parsed from a json string back to their original form.
 * @param {Array} arr
 * @returns {Array}
 */
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

/**
 * Converts values from an object that was parsed from a json string back to their original form.
 * @param {Object} obj
 * @returns {Object}
 */
export const convertJsonObj = (obj) => {
  const curKeys = Object.keys(obj);
  const curVals = convertJsonArr(Object.values(obj));
  return curKeys.reduce((acc, key, i) => {
    acc[key] = curVals[i];
    return acc;
  }, {});
};

/**
 * Just stringifies an object.
 * @param {Object} value
 * @returns {String}
 */
export const toJson = (value) => (
  JSON.stringify(value)
);

/**
 * Parses a json string into its original form. All values are set back to their original form.
 * @param {String} value
 * @returns {Object}
 */
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
