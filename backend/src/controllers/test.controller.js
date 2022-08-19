const tempService = require('@/services/temp.service');
const passService = require('@/services/pass.service');
const userService = require('@/services/user.service');
const catchAsync = require('@/utils/core/catchAsync');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');

const getEmailTempCode = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.query.email)
  if (user) {
    const code = await tempService.getEmailTokenByID(user.account_id);
    if (code) {
      respond(res, code);
    } else {
      respond(res, codes.expired);
    }
  } else {
    respond(res, codes.notFound);
  }
});

const getPassTempCode = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.query.email)
  if (user) {
    const code = await passService.getTempCodeByID(user.account_id);
    if (code) {
      respond(res, code);
    } else {
      respond(res, codes.expired);
    }
  } else {
    respond(res, codes.notFound);
  }
});

module.exports = {
  getEmailTempCode,
  getPassTempCode,
};