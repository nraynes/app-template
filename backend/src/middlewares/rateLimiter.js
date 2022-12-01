const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute intervals
  max: 20,
  message: 'ERRTOOMANYREQUESTS',
  skipSuccessfulRequests: false,
});

const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute intervals
  max: 30,
  message: 'ERRTOOMANYREQUESTS',
  skipSuccessfulRequests: false,
});

const looseLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minute intervals
  max: 50,
  message: 'ERRTOOMANYREQUESTS',
  skipSuccessfulRequests: false,
});


module.exports = {
  authLimiter,
  strictLimiter,
  looseLimiter,
};
