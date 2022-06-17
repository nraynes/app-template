const Joi = require('joi');
const { password } = require('./custom.validation');

const email = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

const tempCode = {
  query: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

const deleteTempCode = {
  body: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

const pass = {
  body: Joi.object().keys({
    accountId: Joi.number().required(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  email,
  tempCode,
  deleteTempCode,
  pass,
};
