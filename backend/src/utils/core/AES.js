const sjcl = require('sjcl');
const { secretKey, useEncryption } = require('@/config/config')

const encrypt = (message) => {
  if (useEncryption) {
    const encrypted = sjcl.encrypt(secretKey, message);
    return encrypted;
  }
  return message;
}

const decrypt = (message) => {
  if (useEncryption) {
    const decrypted = sjcl.decrypt(secretKey, message);
    return decrypted;
  }
  return message;
}

module.exports = {
  encrypt,
  decrypt,
};
