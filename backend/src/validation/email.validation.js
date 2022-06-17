const Joi = require('joi');

const reSendVerify = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  reSendVerify,
};