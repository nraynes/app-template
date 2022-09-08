const cleanText = require('@/utils/misc/cleanText');
const checkForLinks = require('@/utils/misc/checkForLinks');

const clean = (value, helpers) => {
  if (!cleanText(value)) {
    return helpers.message('value must not contain inappropriate language');
  }
  return value;
};

const sanitizeLinks = (value, helpers) => {
  if (checkForLinks(value)) {
    return helpers.message('value must not contain any links');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/)) {
    return helpers.message('password must contain at least 1 number');
  }
  if (!value.match(/[a-z]/)) {
    return helpers.message('password must contain at least 1 lowercase letter');
  }
  if (!value.match(/[A-Z]/)) {
    return helpers.message('password must contain at least 1 uppercase letter');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  // eslint-disable-next-line no-useless-escape
  if (!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
    return helpers.message('phone number must be in a valid format');
  }
  return value;
};


module.exports = {
  clean,
  password,
  phoneNumber,
  sanitizeLinks,
};
