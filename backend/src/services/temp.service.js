const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const addHours = require('@/utils/misc/addHours');
const { compareObjects } = require('@/utils/core/compare');

const prisma = new PrismaClient();

/**
 * Generates a new temporary code for user to validate their email.
 * Returns that code if it was successfully made.
 * @param {Number} account_id
 * @returns {String || null}
 */
const generateEmailCode = async (account_id) => {
  const newCode = {
    account_id,
    email_key: crypto.randomBytes(16).toString('hex'),
    expires: addHours(2)
  }
  const createdCode = await prisma.email_temp_keys.create({
    data: newCode
  })
  if (createdCode && compareObjects(newCode, createdCode)) {
    return createdCode.email_key;
  }
  return null;
};

/**
 * Gets the first email token that is not expired belonging to a given account ID.
 * @param {Number} account_id
 * @returns {String || null}
 */
const getEmailTokenByID = async (account_id) => {
  const token = await prisma.email_temp_keys.findFirst({
    where: {
      account_id,
      expires: {
        gt: new Date()
      }
    }
  })
  if (token) {
    return token.email_key;
  }
  return null;
}

/**
 * Deletes an email temp key.
 * @param {String} key
 */
const deleteEmailTempKey = (key) => (
  prisma.email_temp_keys.deleteMany({
    where: {
      email_key: key,
    }
  })
);

/**
 * Verifies that an email temp key is valid and not expired.
 * Returns the account ID of the user it belongs too if valid.
 * @param {String} key
 * @returns {String}
 */
const verifiyEmailTempKey = async (key) => {
  const tempKey = await prisma.email_temp_keys.findFirst({
    where: {
      email_key: key,
    }
  })
  if (!tempKey) {
    return 'NOTFOUND';
  } else if (new Date(tempKey.expires) < new Date()) {
    await deleteEmailTempKey(tempKey.email_key)
    return 'EXPIRED';
  }
  await deleteEmailTempKey(tempKey.email_key)
  return tempKey.account_id;
};

module.exports = {
  generateEmailCode,
  verifiyEmailTempKey,
  deleteEmailTempKey,
  getEmailTokenByID
};