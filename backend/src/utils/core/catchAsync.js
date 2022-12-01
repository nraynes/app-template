const respond = require('./respond');
const codes = require('@/config/responseCodes');
const log = require('@/utils/misc/log');

/**
 * A callback function that creates a promise and responds to the client with a specific code in the event of an error.
 * @param {Function} fn
 * @returns {Promise}
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    log('\nASYNC ERROR:', err, '\n');
    respond(res, codes.badAsyncCall);
  });
};

module.exports = catchAsync;
