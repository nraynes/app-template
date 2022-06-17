const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute intervals
  max: 20,
  skipSuccessfulRequests: true,
});

const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute intervals
  max: 30,
  skipSuccessfulRequests: false,
});

const looseLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minute intervals
  max: 50,
  skipSuccessfulRequests: false,
});


module.exports = {
  authLimiter,
  strictLimiter,
  looseLimiter,
};
