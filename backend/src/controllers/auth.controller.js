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
const config = require('@/config/config');
const log = require('@/utils/misc/log');

const register = catchAsync(async (req, res) => { // * 'Utilizes SCrypt'
  const {
    email,
    password,
    captcha,
  } = req.body;
  const dynamicSalt = await authService.createUniqueDynamicSalt();
  const notABot = config.frontEndTests || await authService.verifyCaptcha(captcha);
  if (dynamicSalt && notABot) {
    userService.createUser(email, password, dynamicSalt, res);
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
    log('Reauthenticated token for user:', user);
    respond(res, user);
  } else {
    respond(res, codes.forbidden);
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  const token = tokenService.getTokenFromHeader(req);
  const accessToken = await authService.refreshToken(token);
  if (accessToken) {
    log('Created new refresh token.');
    respond(res, accessToken);
  } else {
    respond(res, codes.forbidden);
  }
});

const logout = catchAsync(async (req, res) => {
  const token = tokenService.getTokenFromHeader(req);
  const success = await tokenService.deleteToken(token);
  if (success) {
    log('Logged a user out.');
    respond(res, codes.success);
  } else {
    respond(res, codes.unauthorized);
  }
});

const logoutOfAllDevices = catchAsync(async (req, res) => {
  const success = await tokenService.deleteAllUserTokens(req.user.account_id);
  if (success) {
    log(`Logged a user with ID ${req.user.account_id} out of all of their devices.`)
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
