/**
 * Omits specified keys from an object and returns that object.
 * The exact opposite of Pick.
 * @param {Object} object
 * @param {Array} keys
 * @returns {Object}
 */
const omit = (object, keys) => (
  Object.keys(object).reduce((obj, key) => {
    if (!keys.includes(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {})
);

module.exports = omit;
