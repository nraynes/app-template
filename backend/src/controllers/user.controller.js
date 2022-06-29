const tempService = require('@/services/temp.service');
const userService = require('@/services/user.service');
const catchAsync = require('@/utils/core/catchAsync');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');
const pick = require('@/utils/formatters/pick');
const config = require('@/config/config');

const verifyEmail = catchAsync(async (req, res) => {
  const accountID = await tempService.verifiyEmailTempKey(req.body.emailKey);
  if (accountID === 'EXPIRED') {
    respond(res, codes.expired);
  } else if (accountID === 'NOTFOUND') {
    respond(res, codes.notFound);
  } else {
    const verifiedEmail = userService.verifyEmail(accountID);
    if (verifiedEmail) {
      respond(res, codes.success);
    } else {
      respond(res, codes.failure);
    }
  }
});

const getInfo = catchAsync(async (req, res) => {
  const user = await userService.getUserByID(req.user.account_id);
  if (user) {
    respond(res, pick(user, config.userAccountInfoKeys));
  } else {
    respond(res, codes.notFound);
  }
});

const editInfo = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByID(req.user.account_id);
  if (user) {
    const checkUserEmail = await userService.getUserByEmail(email);
    if ((!checkUserEmail || checkUserEmail.email === user.email)) {
      const success = await userService.editUserInfo(req.user.account_id, email);
      if (success) {
        if (email !== user.email) {
          const unverified = await userService.unverifyUser(req.user.account_id)
          if (unverified === 'NOCREDITS') {
            respond(res, codes.noCredits);
          } else if (unverified) {
            respond(res, codes.success);
          } else {
            respond(res, codes.failure);
          }
        } else {
          respond(res, codes.success);
        }
      } else {
        respond(res, codes.failure);
      }
    } else {
      respond(res, codes.alreadyExists);
    }
  } else {
    respond(res, codes.notFound);
  }
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByID(req.user.account_id);
  if (user) {
    const success = await userService.deleteUserByID(req.user.account_id);
    if (success) {
      respond(res, codes.success);
    } else {
      respond(res, codes.failure);
    }
  } else {
    respond(res, codes.notFound);
  }
});

module.exports = {
  verifyEmail,
  getInfo,
  editInfo,
  deleteUser,
};
