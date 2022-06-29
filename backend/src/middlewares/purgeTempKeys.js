/* eslint-disable no-var */
/* eslint-disable no-console */
const passService = require('@/services/pass.service');
const { noMoreCredits } = require('@/config/config');
const log = require('@/utils/misc/log');

var ready = true;
const frequency = 1 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds.

const readyFrequency = async () => {
  if (ready === true) {
    ready = false;
    setTimeout(() => { ready = true; }, frequency);
  }
};

const purgeTempKeys = () => (_req, _res, next) => {
  if (ready === true) {
    log('Attempting to purge expired temp keys');
    const today = new Date();
    passService.deleteExpiredTempKeys();
    if (noMoreCredits && noMoreCredits instanceof Date) {
      if (today.getMonth() > noMoreCredits.getMonth()) {
        noMoreCredits = false;
      }
    }
  }
  readyFrequency();
  return next();
};

module.exports = purgeTempKeys;
