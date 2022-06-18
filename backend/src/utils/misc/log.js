const formatDate = require('@/utils/formatters/format');

function log(message, ...args) {
  // if (process.env.NODE_ENV === 'development') {
    console.log(`${formatDate(new Date())} ::: ${message}`, ...args);
  // }
}

module.exports = log;