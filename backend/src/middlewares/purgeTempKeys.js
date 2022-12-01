const passService = require('@/services/pass.service');
const config = require('@/config/config');
const log = require('@/utils/misc/log');

var ready = true;
// frequency set for 1 hour.
// const frequency = 1 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds.
const frequency = 2 * 1000; // seconds * milliseconds.

const readyFrequency = async () => {
  if (ready === true) {
    ready = false;
    setTimeout(() => { ready = true; }, frequency);
  }
};

function getFirstDayOfNextMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

// This will automatically purge all expired temp keys from the database on frequent basis.
const purgeTempKeys = () => (_req, _res, next) => {
  if (ready === true) {
    log('Attempting to purge expired temp keys');
    const today = new Date();
    passService.deleteExpiredTempKeys();
    if (config.noMoreCredits) {
      log('Email credits are used up for the month.');
      log(`Email credits will be restored on ${getFirstDayOfNextMonth()}`);
      if (today.getMonth() > config.noMoreCredits.getMonth()) {
        config.noMoreCredits = false;
        log('Email credits have been restored for this month!');
      }
    }
  }
  readyFrequency();
  return next();
};

module.exports = purgeTempKeys;
