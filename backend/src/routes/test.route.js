const express = require('express');
const testController = require('@/controllers/test.controller');
const testValidation = require('@/validation/test.validation');
const validate = require('@/middlewares/validate');

const router = express.Router();

router.get('/emailTempCode', validate(testValidation.email), testController.getEmailTempCode);

router.get('/passTempCode', validate(testValidation.email), testController.getPassTempCode);

module.exports = router;