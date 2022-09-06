const formatDate = require('../formatters/format');

/**
 * Console logs only if not in test environment.
 * @param {String} message
 * @param {Any} args
 * @returns {undefined}
 */

function log(message, ...args) {
  if (
    process.env.NODE_ENV !== 'test'
    // && process.env.NODE_ENV === 'development'
  ) {
    console.log(`${formatDate(new Date())} ::: ${message}`, ...args);
  }
}

module.exports = log;
