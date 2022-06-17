const express = require('express');
const validate = require('@/middlewares/validate');
const authorize = require('@/middlewares/authorize');
const authValidation = require('@/validation/auth.validation');
const authController = require('@/controllers/auth.controller');

const router = express.Router();

// This /me route is an authorizing function in itself and does not need authorization middleware.
router.get('/me', validate(authValidation.tokenHeader), authController.me);

router.post('/login', validate(authValidation.login), authController.login);
router.post('/register', validate(authValidation.register), authController.register);
router.post('/token', validate(authValidation.tokenHeader), authController.refreshTokens);

router.delete('/logout', validate(authValidation.tokenHeader), authorize(), authController.logout);
router.delete('/logoutOfAllDevices', validate(authValidation.tokenHeader), authorize(), authController.logoutOfAllDevices);

module.exports = router;