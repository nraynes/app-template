const log = require('@/utils/misc/log');
const config = require('@/config/config');

const logConnection = () => async (req, res, next) => {
  log('Connection Logged');
  log(`Running in ${config.env} mode.`)
  log(`Front end tests are ${config.frontEndTests ? 'on' : 'off'}.`)
  return next();
};

module.exports = logConnection;
