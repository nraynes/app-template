const Joi = require('joi');
const { password, clean } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(clean),
    password: Joi.string().required().custom(password),
    captcha: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const tokenHeader = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  tokenHeader,
};
