const log = require('@/utils/misc/log');

const logConnection = () => async (req, res, next) => {
  log('Connection Logged');
  return next();
};

module.exports = logConnection;
