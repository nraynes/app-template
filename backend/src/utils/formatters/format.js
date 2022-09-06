const padZeros = require('./padZeros');

/**
 * Formats a date object into an easy to read string.
 * Date formats into "DD-MM-YYYY HH:MM:SS"
 * @param {Date} date
 * @returns {String}
 */

const formatDate = (date) => (
  `${padZeros(date.getDate(), 2)}-${padZeros(date.getMonth()+1, 2)}-${padZeros(date.getFullYear(), 4)} ${padZeros(date.getHours(), 2)}:${padZeros(date.getMinutes(), 2)}:${padZeros(date.getSeconds(), 2)}`
);

module.exports = formatDate;
