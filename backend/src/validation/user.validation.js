const Joi = require('joi');
const { clean } = require('./custom.validation');

const verifyEmail = {
  body: Joi.object().keys({
    emailKey: Joi.string().required(),
  }),
};

const editUserInfo = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  body: {
    email: Joi.string().required().email().custom(clean),
  }
};

module.exports = {
  verifyEmail,
  editUserInfo,
  getUsers,
  accountAction,
  accountMessage,
  readNotifications,
  allMessage,
};