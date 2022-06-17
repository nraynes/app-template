const express = require('express');
const userController = require('@/controllers/user.controller');
const authValidation = require('@/validation/auth.validation');
const userValidation = require('@/validation/user.validation');
const validate = require('@/middlewares/validate');
const authorize = require('@/middlewares/authorize');
const { strictLimiter, looseLimiter } = require('@/middlewares/rateLimiter');

const router = express.Router();

router.get('/info', looseLimiter, validate(authValidation.tokenHeader), authorize(), userController.getInfo);

router.patch('/info', strictLimiter, validate(userValidation.editUserInfo), authorize(), userController.editInfo);

router.delete('/delete', strictLimiter, validate(authValidation.tokenHeader), authorize(), userController.deleteUser);

module.exports = router;
