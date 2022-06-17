/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable max-len */

// * = response object from express 'res' is being passed to functions that utilize crypto.scrypt function
// because crypto.scrypt can not be awaited so the response needs to be sent from inside the callback that
// is passed to the scrypt function.

const authService = require('@/services/auth.service');
const userService = require('@/services/user.service');
const tokenService = require('@/services/token.service');
const catchAsync = require('@/utils/core/catchAsync');
const respond = require('@/utils/core/respond');
const codes = require('@/config/responseCodes');

const register = catchAsync(async (req, res) => { // * 'Utilizes SCrypt'
  const {
    email,
    password,
    captcha,
  } = req.body;
  const dynamicSalt = await authService.createUniqueDynamicSalt();
  const notABot = await authService.verifyCaptcha(captcha);
  if (dynamicSalt && notABot) {
    userService.createUser(username, email, password, phoneNumber, anonymous, dynamicSalt, res);
  } else if (!notABot) {
    respond(res, codes.captchaFailed)
  } else {
    respond(res, codes.failure)
  }
});

const login = catchAsync(async (req, res) => { // * 'Utilizes SCrypt'
  const { email, password } = req.body;
  authService.loginUserWithEmailAndPassword(email, password, res);
});

const me = catchAsync(async (req, res) => {
  const token = tokenService.getTokenFromHeader(req);
  const user = await authService.authMe(token);
  if (user) {
    respond(res, user);
  } else {
    respond(res, codes.forbidden);
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  const token = tokenService.getTokenFromHeader(req);
  const accessToken = await authService.refreshToken(token);
  if (accessToken) {
    respond(res, accessToken);
  } else {
    respond(res, codes.forbidden);
  }
});

const logout = catchAsync(async (req, res) => {
  const token = tokenService.getTokenFromHeader(req);
  const success = tokenService.deleteToken(token);
  if (success) {
    respond(res, codes.success);
  } else {
    respond(res, codes.failure);
  }
});

const logoutOfAllDevices = catchAsync(async (req, res) => {
  const success = await tokenService.deleteAllUserTokens(req.user.account_id);
  if (success) {
    respond(res, codes.success);
  } else {
    respond(res, codes.failure);
  }
});

module.exports = {
  register,
  login,
  me,
  refreshTokens,
  logout,
  logoutOfAllDevices
};
