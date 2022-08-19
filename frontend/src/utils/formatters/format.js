const padZeros = require('./padZeros');

const formatDate = (date) => (
  `${padZeros(date.getDate(), 2)}-${padZeros(date.getMonth()+1, 2)}-${padZeros(date.getFullYear(), 4)} ${padZeros(date.getHours(), 2)}:${padZeros(date.getMinutes(), 2)}:${padZeros(date.getSeconds(), 2)}`
);

module.exports = formatDate;
