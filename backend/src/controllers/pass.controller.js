const emailService = require('@/services/email.service');
const passService = require('@/services/pass.service');
const userService = require('@/services/user.service');
const catchAsync = require('@/utils/core/catchAsync');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');

const sendPasswordReset = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    respond(res, codes.notFound);
  } else {
    const tempCode = await passService.generateTempCode(user.account_id);
    if (tempCode) {
      const email = emailService.generateEmail(tempCode);
      const success = await emailService.sendEmail(user.email, email.subject, email.messageBody);
      if (success) {
        respond(res, codes.success);
      } else {
        respond(res, codes.failure);
      }
    } else {
      respond(res, codes.failure);
    }
  }
});

const deleteKey = catchAsync(async (req, res) => {
  const success = passService.deleteKey(req.body.code);
  if (success) {
    respond(res, codes.success);
  } else {
    respond(res, codes.failure);
  }
});

const resetPassword = catchAsync(async (req, res) => {
  const { accountId, password } = req.body;
  await passService.resetUserPassword(accountId, password, res);
});

const getTempCode = catchAsync(async (req, res) => {
  const { code } = req.query;
  const accountID = await passService.validateTempCode(code);
  if (accountID) {
    respond(res, accountID);
  } else {
    respond(res, codes.notValid);
  }
});

module.exports = {
  sendPasswordReset,
  deleteKey,
  resetPassword,
  getTempCode,
};
