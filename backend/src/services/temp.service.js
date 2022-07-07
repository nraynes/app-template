/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable dot-notation */
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const addHours = require('@/utils/misc/addHours');
const { compareObjects } = require('@/utils/core/compare');

const prisma = new PrismaClient();

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
  } else {
    return null;
  }
};

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

const deleteEmailTempKey = (key) => (
  prisma.email_temp_keys.deleteMany({
    where: {
      email_key: key,
    }
  })
);

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
