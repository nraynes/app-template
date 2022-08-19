const Joi = require('joi');

const email = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  email,
};