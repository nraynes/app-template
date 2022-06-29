const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const config = require('@/config/config');
const userService = require('./user.service');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');
const log = require('@/utils/misc/log');
const addHours = require('@/utils/misc/addHours');

const prisma = new PrismaClient();

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

const deleteKey = async (tempKey) => {
  await prisma.pass_temp_keys.deleteMany({
    where: {
      pass_key: tempKey,
    },
  });
  const check = await prisma.pass_temp_keys.findFirst({
    where: {
      pass_key: tempKey,
    },
  });
  if (!check) {
    return true;
  }
  return false;
};

const resetUserPassword = async (id, password, res) => {
  const user = await userService.getUserByID(id);
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
          account_id: id,
        },
      });
      if (changedUser.password_hash === newPasswordHash) {
        respond(res, codes.success);
      } else {
        respond(res, codes.failure);
      }
    });
  } else {
    respond(res, codes.notFound)
  }
};

const generateTempCode = async (id) => {
  const createObj = {
    account_id: id,
    pass_key: crypto.randomBytes(16).toString('hex'),
    expires: addHours(2),
  };
  const retVal = await prisma.pass_temp_keys.create({
    data: createObj,
  });
  if (retVal) {
    return retVal.pass_key;
  }
  return false;
};

const validateTempCode = async (tempCode) => {
  const findCode = await prisma.pass_temp_keys.findFirst({
    where: {
      pass_key: tempCode,
    },
  });
  if (findCode) {
    const today = new Date()
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
  })
  return code;
}

const myExports = {
  generateTempCode,
  validateTempCode,
  resetUserPassword,
  deleteKey,
  deleteExpiredTempKeys,
}

if (process.env.NODE_ENV === 'test') {
  myExports.getTempCodeByID = getTempCodeByID;
}

module.exports = myExports;
