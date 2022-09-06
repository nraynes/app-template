/**
 * Picks specified keys from an object and returns that object.
 * The exact opposite of Omit.
 * @param {Object} object
 * @param {Array} keys
 * @returns {Object}
 */
const pick = (object, keys) => (
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {})
);

module.exports = pick;
