const log = require('@/utils/misc/log');
const config = require('@/config/config');

const logConnection = () => async (req, res, next) => {
  log('Connection Logged');
  log(`Running in ${config.env} mode.`);
  log(`Server Address is ${config.server}`);
  log(`Front end tests are ${config.frontEndTests ? 'on' : 'off'}.`);
  log('Request Query:', req.query);
  log('Request Body:', req.body);
  log('Request Method:', req.method);
  log('Request Url:', req.url);
  return next();
};

module.exports = logConnection;
