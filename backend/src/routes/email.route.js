const express = require('express');
const userController = require('@/controllers/user.controller');
const emailController = require('@/controllers/email.controller');
const emailValidation = require('@/validation/email.validation');
const userValidation = require('@/validation/user.validation');
const validate = require('@/middlewares/validate');
const { strictLimiter } = require('@/middlewares/rateLimiter');

const router = express.Router();

router.post('/verify', strictLimiter, validate(emailValidation.reSendVerify), emailController.reSendVerify);

router.patch('/verify', strictLimiter, validate(userValidation.verifyEmail), userController.verifyEmail);

module.exports = router;
