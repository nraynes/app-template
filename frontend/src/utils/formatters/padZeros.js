/**
 * Pads a string or number with a specific number of zeros.
 * return string is meant to be the length of num, with zeros added up to this number.
 * @param {String || Number} str
 * @param {Number} num
 * @returns {String}
 */
const padZeros = (str, num) => {
  str = `${str}`.substring(0, num);
  for (let i = 0; i < num; i += 1) {
    if (str.length < num) {
      str = `0${str}`;
    }
  }
  return str;
};

export default padZeros;