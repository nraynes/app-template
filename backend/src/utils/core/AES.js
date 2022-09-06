const sjcl = require('sjcl');
const { secretKey, useEncryption, encryption } = require('../../config/config')

/**
 * Encrypts a message using the configuration specified in the config file.
 * @param {String} message
 * @returns {String}
 */
const encrypt = (message) => {
  if (useEncryption) {
    const encrypted = sjcl.encrypt(secretKey, message, encryption.config);
    return JSON.parse(encrypted).ct;
  }
  return message;
}

/**
 * Decrypts a message using the configuration specified in the config file.
 * @param {String} message
 * @returns {String}
 */
const decrypt = (message) => {
  if (useEncryption) {
    const encrypted = encryption.config;
    encrypted.ct = message;
    const encryptedJSON = JSON.stringify(encrypted);
    const decrypted = sjcl.decrypt(secretKey, encryptedJSON);
    return decrypted;
  }
  return message;
}

module.exports = {
  encrypt,
  decrypt,
};
