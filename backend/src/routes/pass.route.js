const express = require('express');
const passController = require('@/controllers/pass.controller');
const passValidation = require('@/validation/pass.validation');
const validate = require('@/middlewares/validate');
const { strictLimiter } = require('@/middlewares/rateLimiter');

const router = express.Router();

router.get('/tempCode', strictLimiter, validate(passValidation.tempCode), passController.getTempCode);

router.post('/forgotPassword', strictLimiter, validate(passValidation.email), passController.sendPasswordReset);

router.patch('/changePassword', strictLimiter, validate(passValidation.pass), passController.resetPassword);

router.delete('/tempCode', strictLimiter, validate(passValidation.deleteTempCode), passController.deleteKey);

module.exports = router;
