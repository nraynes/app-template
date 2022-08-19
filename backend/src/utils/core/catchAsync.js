const respond = require('./respond');
const codes = require('@/config/responseCodes');
const log = require('@/utils/misc/log');

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    log('\nASYNC ERROR:', err, '\n');
    respond(res, codes.badAsyncCall);
  });
};

module.exports = catchAsync;
