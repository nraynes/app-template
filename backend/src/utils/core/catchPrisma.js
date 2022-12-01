const log = require('@/utils/misc/log');

/**
 * Executes a prisma command in a try block to prevent terminating errors.
 * @param {Function} cb
 * @returns {cb return value || null}
 */
const catchPrisma = async (cb) => {
  try {
    return await cb();
  } catch (e) {
    log('Could not execute prisma function!');
    log('PRISMA ERROR:', e);
    return null;
  }
};

module.exports = catchPrisma;
