const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { compareObjects } = require('@/utils/core/compare');
const log = require('@/utils/misc/log');
const config = require('@/config/config');
const tokenTypes = require('@/config/tokens');

const prisma = new PrismaClient();

/**
 * Gets the JWT from the header of a request.
 * @param {Object} req
 * @returns {String}
 */
const getTokenFromHeader = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

/**
 * Deletes all of the JWT's for a given user. Returns whether or not it was successful.
 * @param {Number} userID
 * @returns {Boolean}
 */
async function deleteAllUserTokens(userID) {
  if (userID) {
    const firstCheck = await prisma.tokens.findFirst({
      where: {
        account_id: userID,
      },
    });
    if (firstCheck) {
      await prisma.tokens.deleteMany({
        where: {
          account_id: userID,
        },
      });
      const secondCheck = await prisma.tokens.findFirst({
        where: {
          account_id: userID,
        },
      });
      if (!secondCheck) {
        log('Deleted tokens successfully...', secondCheck);
        return true;
      }
      log('Could not delete tokens... ', secondCheck);
    } else {
      log('No tokens were not found...');
      return true;
    }
  } else {
    log('No user ID was passed...');
  }
  return false;
}

/**
 * Deletes a specific JWT from the database. Returns whether or not it was successful.
 * @param {String} passedToken
 * @returns {Boolean}
 */
async function deleteToken(passedToken) {
  if (passedToken) {
    if (!passedToken.match('Bearer')) {
      passedToken = `Bearer ${passedToken}`;
    }
    const firstCheck = await prisma.tokens.findFirst({
      where: {
        token: passedToken,
      },
    });
    if (firstCheck) {
      await prisma.tokens.deleteMany({
        where: {
          token: passedToken,
        },
      });
      const secondCheck = await prisma.tokens.findFirst({
        where: {
          token: passedToken,
        },
      });
      if (!secondCheck) {
        log('Deleted Token Successfully...', secondCheck);
        return true;
      }
      log('Could not delete token... ', secondCheck);
    } else {
      log('Token was not found...');
    }
  } else {
    log('No token was passed...');
  }
  return false;
}

/**
 * Verifies a JWT and returns the user object encoded in the JWT if valid.
 * @param {String} token
 * @param {String} type
 * @returns {Object || null}
 */
const verifyToken = (token, type) => {
  let secret;
  const isRefresh = type === tokenTypes.REFRESH;
  if (type === tokenTypes.ACCESS) {
    secret = config.jwt.accessSecret;
  } else if (isRefresh) {
    secret = config.jwt.refreshSecret;
  } else {
    return null;
  }
  return jwt.verify(token, secret, (err, user) => {
    if (err) {
      if (isRefresh) {
        deleteToken(token);
      }
      return null;
    }
    return user;
  });
};

/**
 * Generates a JWT access token.
 * @param {Object} data
 * @returns {String}
 */
function generateAccessToken(data) {
  return `Bearer ${jwt.sign(data, config.jwt.accessSecret, { expiresIn: `${config.jwt.accessExpirationMinutes}m` })}`;
}

/**
 * Generates a JWT refresh token.
 * @param {Object} data
 * @returns {String}
 */
function generateRefreshToken(data) {
  return `Bearer ${jwt.sign(data, config.jwt.refreshSecret, { expiresIn: `${config.jwt.refreshExpirationDays}d` })}`;
}

/**
 * Saves a JWT to the database. Returns whether or not it was successful.
 * @param {String} passedToken
 * @param {Number} id
 * @returns {Object}
 */
async function saveToken(passedToken, id) {
  const tokenToSave = {
    account_id: id,
    token: passedToken,
  };
  const checkToken = await prisma.tokens.create({
    data: tokenToSave,
  });
  if (compareObjects(tokenToSave, checkToken)) {
    return true;
  }
  return false;
}

/**
 * Generates an object with both access and refresh tokens for a
 * given user and returns it if successfully saved to the database.
 * @param {Object} user
 * @returns {Object || null}
 */
const generateTokens = async (user) => {
  const refToken = generateRefreshToken(user);
  const success = await saveToken(refToken, user.account_id);
  if (success) {
    return {
      accessToken: generateAccessToken(user),
      refreshToken: refToken,
    };
  }
  return null;
};

module.exports = {
  getTokenFromHeader,
  generateTokens,
  verifyToken,
  generateAccessToken,
  deleteToken,
  deleteAllUserTokens,
};
