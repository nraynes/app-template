const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const config = require('@/config/config');
const userService = require('./user.service');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');
const log = require('@/utils/misc/log');
const addHours = require('@/utils/misc/addHours');
const { compareObjects } = require('@/utils/core/compare');

const prisma = new PrismaClient();

/**
 * Deletes all temporary keys in the database that have expired.
 */
const deleteExpiredTempKeys = async () => {
  const today = new Date();
  await prisma.pass_temp_keys.deleteMany({
    where: {
      expires: {
        lt: today,
      },
    },
  });
  await prisma.email_temp_keys.deleteMany({
    where: {
      expires: {
        lt: today,
      },
    },
  });
};

/**
 * Deletes a password temporary key. Returns whether or not it was successful in doing so.
 * @param {String} key
 * @returns {Boolean}
 */
const deleteKey = async (key) => {
  await prisma.pass_temp_keys.deleteMany({
    where: {
      pass_key: key,
    },
  });
  const check = await prisma.pass_temp_keys.findFirst({
    where: {
      pass_key: key,
    },
  });
  if (!check) {
    return true;
  }
  return false;
};

/**
 * Resets the password for a user object. Does not return anything as this function responds to the request.
 * @param {Number} account_id
 * @param {String} password
 * @param {Object} res
 */
const resetUserPassword = async (account_id, password, res) => {
  const user = await userService.getUserByID(account_id);
  if (user) {
    const salt = `${user.dynamic_salt}${config.static.salt}`;
    crypto.scrypt(password, salt, 96, {}, async (err, key) => {
      if (err) {
        respond(res, codes.failure);
        return null;
      }
      const newPasswordHash = key.toString('base64');
      const changedUser = await prisma.accounts.update({
        data: {
          password_hash: newPasswordHash,
        },
        where: {
          account_id,
        },
      });
      if (changedUser.password_hash === newPasswordHash) {
        respond(res, codes.success);
      } else {
        respond(res, codes.failure);
      }
    });
  } else {
    respond(res, codes.notFound);
  }
};

/**
 * Generates a temporary code for a user to reset their password. Returns that new code if it was succesfully made.
 * @param {Number} account_id
 * @returns {String}
 */
const generateTempCode = async (account_id) => {
  const createObj = {
    account_id,
    pass_key: crypto.randomBytes(16).toString('hex'),
    expires: addHours(2),
  };
  const createdCode = await prisma.pass_temp_keys.create({
    data: createObj,
  });
  if (createdCode && compareObjects(createObj, createdCode)) {
    return createdCode.pass_key;
  }
  return null;
};

/**
 * Validates that a temp code is valid and not expired.
 * Returns the Account ID of the person the temp code belongs too.
 * @param {String} tempCode
 * @returns {Number || null}
 */
const validateTempCode = async (tempCode) => {
  const findCode = await prisma.pass_temp_keys.findFirst({
    where: {
      pass_key: tempCode,
    },
  });
  if (findCode) {
    const today = new Date();
    const expiration = new Date(findCode.expires);
    if (today > expiration) {
      log('Temp key expired, attempting to delete.');
      await prisma.pass_temp_keys.deleteMany({
        where: {
          pass_key: tempCode,
        },
      });
      return null;
    }
    return findCode.account_id;
  }
  log('Temp key not found');
  return null;
};

/**
 * Gets the first temporary code that is not expired belonging to a given account ID.
 * @param {Number} account_id
 * @returns {String || null}
 */
const getTempCodeByID = async (account_id) => {
  const code = await prisma.pass_temp_keys.findFirst({
    select: {
      pass_key: true,
    },
    where: {
      account_id,
      expires: {
        gt: new Date(),
      }
    }
  });
  return code;
};

const myExports = {
  generateTempCode,
  validateTempCode,
  resetUserPassword,
  deleteKey,
  deleteExpiredTempKeys,
  getTempCodeByID,
};

module.exports = myExports;