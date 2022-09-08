const crypto = require('crypto');
const config = require('../../config/config');

// This utility function is not explicitly tested because it
// is inherently needed for almost all of the backend tests to work.
// If the backend tests are passing, This function is definitely working.
// This will take a password and give back an object containing the password
// hash and dynamic salt for that password.

/**
 * Creates a hash of a given password with included static and dynamic salt.
 * @param {String} password
 * @returns {Object}
 */

const createPasswordHash = async (password) => {
  return new Promise((resolve, reject) => {
    const dynamic_salt = crypto.randomBytes(16).toString('hex');
    const salt = `${dynamic_salt}${config.static.salt}`;
    crypto.scrypt(password, salt, 96, {}, (err, key) => {
      if (err) {
        reject(err);
      }
      const password_hash = key.toString('base64');
      resolve({
        password_hash,
        dynamic_salt,
      });
    });
  });
};

module.exports = createPasswordHash;