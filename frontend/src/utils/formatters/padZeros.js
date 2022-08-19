/* eslint-disable no-param-reassign */
const padZeros = (str, num) => {
  str = `${str}`.substring(0, num);
  for (let i = 0; i < num; i += 1) {
    if (str.length < num) {
      str = `0${str}`;
    }
  }
  return str;
};

module.exports = padZeros;
