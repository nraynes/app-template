/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
// const { tokenTypes } = require('@/config/tokens');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const emailService = require('./email.service');
const tempService = require('./temp.service');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');
const config = require('@/config/config');
const compareObjects = require('@/utils/core/compareObjects');
const pick = require('@/utils/formatters/pick');

const prisma = new PrismaClient();

const getUserByEmail = (email) => (
  prisma.accounts.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive'
      },
      deleted_on: null,
    }
  })
)

const getUserByID = (account_id) => (
  prisma.accounts.findFirst({
    where: {
      account_id,
      deleted_on: null,
    }
  })
)

const deleteUserByID = async (account_id) => {
  const user = await prisma.accounts.update({
    data: {
      deleted_on: new Date()
    },
    where: {
      account_id,
    },
  })
  if (user.deleted_on) {
    return true;
  }
  return false;
};

async function createUser(email, password, dynamicSalt, res) {
  const checkIfUserExists = await getUserByEmail(email);
  if (checkIfUserExists) {
    respond(res, codes.alreadyExists);
  } else {
    const salt = `${dynamicSalt}${config.static.salt}`;
    crypto.scrypt(password, salt, 96, {}, async (err, key) => {
      if (err) {
        respond(res, codes.failure);
        throw err;
      }
      const password_hash = key.toString('base64');
      const userObject = {
        email: email.toLowerCase(),
        password_hash,
        dynamic_salt: dynamicSalt,
        verified: false,
      }
      const newUser = await prisma.accounts.create({
        data: userObject
      })
      const tempKey = await tempService.generateEmailCode(newUser.account_id)
      if (newUser && compareObjects(userObject, newUser)) {
        if (tempKey) {
          emailService.sendVerifyEmail(newUser.email, tempKey)
          respond(res, codes.success);
        } else {
          await deleteUserByID(newUser.account_id);
          respond(res, codes.failure);
        }
      } else {
        respond(res, codes.failure);
      }
    })
  }
}

const verifyEmail = async (account_id) => {
  const updatedUser = await prisma.accounts.update({
    data: {
      verified: true
    },
    where: {
      account_id,
    }
  })
  if (updatedUser && updatedUser.verified) {
    return true;
  }
  return false;
};

const editUserInfo = async (account_id, email) => {
  const parcel = {
    email: email.toLowerCase(),
  };
  const updatedUser = await prisma.accounts.update({
    data: parcel,
    where: {
      account_id,
    }
  })
  if (compareObjects(parcel, updatedUser)) {
    return true;
  }
  return false;
}

const unverifyUser = async (account_id) => {
  const user = await prisma.accounts.update({
    data: {
      verified: false,
    },
    where: {
      account_id,
    }
  })
  if (user) {
    const tempKey = await tempService.generateEmailCode(account_id)
    if (tempKey) {
      emailService.sendVerifyEmail(user.email, tempKey)
      return true;
    }
  }
  return false;
}

module.exports = {
  createUser,
  getUserByID,
  getUserByEmail,
  verifyEmail,
  editUserInfo,
  unverifyUser,
};
