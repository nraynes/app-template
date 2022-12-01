const emailService = require('@/services/email.service');
const tempService = require('@/services/temp.service');
const userService = require('@/services/user.service');
const catchAsync = require('@/utils/core/catchAsync');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');

const reSendVerify = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (user) {
    let emailToken = await tempService.getEmailTokenByID(user.account_id);
    if (!emailToken) {
      emailToken = await tempService.generateEmailCode(user.account_id);
    }
    if (emailToken) {
      const success = await emailService.sendVerifyEmail(user.email, emailToken);
      if (success === 'NOCREDITS') {
        respond(res, codes.noCredits);
      } else if (success) {
        respond(res, codes.success);
      } else {
        respond(res, codes.failure);
      }
    } else {
      await userService.deleteUserByID(user.account_id);
      respond(res, codes.failure);
    }
  } else {
    respond(res, codes.notFound);
  }
});

module.exports = {
  reSendVerify,
};
