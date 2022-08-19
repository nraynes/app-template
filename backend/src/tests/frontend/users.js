const sjcl = require('sjcl');
const { useEncryption, secretKey, encryption } = require('../../config/config');
const testPicture = require('./picture');

const encrypt = (message) => {
  if (useEncryption) {
    const encrypted = sjcl.encrypt(secretKey, message, encryption.config);
    return JSON.parse(encrypted).ct;
  }
  return message;
}

const accounts = [
  {
    email: useEncryption ? encrypt('amydavis@email.com') : 'amydavis@email.com',
    password_hash: 'v35lsNY/S6FAZZ/gaSXnjhuwy9F49OgujSbLFWRrlklwpKb35kLe/ifkIFKo6Rfi5I33Prxb/3+4g+9Bru93uIzWoxnkH0nqjqR8U6Q1Bx5wVtjYMU5uqbsiTAoH/mAo',
    dynamic_salt: '8e573260e86d902525510ede9de79070',
    verified: true,
    photo: testPicture,
  },
  {
    email: useEncryption ? encrypt('jamesbrown@email.com') : 'jamesbrown@email.com',
    password_hash: 'sJxQIwESsSS2G/6f5GLFOtozLOQdvXIPLGR1U24fGsm2qqnuq7MYO488gcUHU+PYGFynMlAPj9m6qYVHwqaDBRPFXKS6vhGggU7rn05iLed2Gzi41gY5CgXmQWP+ow/m',
    dynamic_salt: '0b72c759c7f00ce93267528e33858e8f',
    verified: true,
  },
  {
    email: useEncryption ? encrypt('paulblart@email.com') : 'paulblart@email.com',
    password_hash: 'UWRzveefhktgbmDmnnW6CdSEHBQ3v9+UgcVhDwbB8umjIYzrU0GIRNISrd9g2iQxbDb6RU3JSJv6tfAJTEmX/kuP/84vB4H8xjqtZCZjImlVHuuCI+UL14xXKE1paAMJ',
    dynamic_salt: '6826af47871e8cf5a02c8190a12c1c6d',
    verified: false,
  },
  {
    email: useEncryption ? encrypt('maxmiller@email.com') : 'maxmiller@email.com',
    password_hash: 'x2MCQFOwjLMJZ0myIYBEDRktLlN1Wt9IvoTFBVfKvmgwXE/zgqCbmBkZrbmRRdyJrPwu+28PlodwAPgTki9a5wuF+afUBAX0EQoUjDCarBBHEon20vMHpAwSIXubQ4Jo',
    dynamic_salt: '63e7ef77a14c08382d9b0f7a839b195c',
    verified: true,
  }
];

module.exports = accounts;