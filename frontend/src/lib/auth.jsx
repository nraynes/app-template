import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import { queryClient } from './react-query';
import LoadingPage from '@/components/LoadingPage';
import log from '@/utils/misc/log';
import { setToken, clearTokens } from '@/utils/browser/tokens';
import getUser from '@/features/auth/api/getUser';
import loginWithUsernameAndPassword from '@/features/auth/api/login';
import logout from '@/features/auth/api/logout';
import refreshToken from '@/features/auth/api/refreshTokens';
import createAccount from '@/features/auth/api/createAccount';
import sendVerifyEmail from '@/features/auth/api/sendVerifyEmail';
import generateJoiError from '@/utils/formatters/generateJoiError';
import verifyEmail from '@/features/auth/api/verifyEmail';

export async function verifyEmailWithKey(emailVerificationCode) {
  const { enqueueSnackbar, nowAwaiting, notAwaiting } = window;
  if (emailVerificationCode) {
    nowAwaiting();
    const success = await verifyEmail(emailVerificationCode);
    notAwaiting();
    if (success === 'EXPIRED') {
      enqueueSnackbar('The email verification token has expired. Please try to log in to resend a new token.', { variant: 'error' })
    } else if (success === 'NOTFOUND') {
      enqueueSnackbar('The email verification token could not be found. Please try to log in to resend a new token.', { variant: 'error' })
    } else if (success === 'FAILURE') {
      enqueueSnackbar('There was a problem verifying your email.', { variant: 'error' })
    } else {
      enqueueSnackbar('Your email has been successfully verified!', { variant: 'success' })
    }
  }
};

async function sendVerificationEmail(email) {
  const { enqueueSnackbar, ask, nowAwaiting, notAwaiting } = window;
  ask('Not Verified', 'Your account is not verified. Would you like to resend the verification email?', async (answer) => {
    if (answer) {
      nowAwaiting();
      const response = await sendVerifyEmail(email);
      notAwaiting()
      if (response === 'FAILURE') {
        enqueueSnackbar('There was a problem sending the verification email.', { variant: 'error' })
      } else if (response === 'ASYNCERROR') {
        enqueueSnackbar('The server could not process the request.', { variant: 'error' })
      } else if (response === 'NOTFOUND') {
        enqueueSnackbar('Could not send verification email as account does not exist.', { variant: 'error' })
      } else {
        enqueueSnackbar('Verification email has been sent!', { variant: 'success' })
      }
    }
  })
}

async function loginFn({ email, password }) {
  const { enqueueSnackbar, nowAwaiting, notAwaiting, navigate } = window;
  nowAwaiting();
  const response = await loginWithUsernameAndPassword(email, password);
  notAwaiting();
  if (response === 'NOTFOUND') {
    enqueueSnackbar('There was no user matching those credentials.', { variant: 'error' })
  } else if (response === 'NOTVERIFIED') {
    await sendVerificationEmail(email);
  } else if (response === 'ASYNCERROR') {
    enqueueSnackbar('The server could not process the request.', { variant: 'error' })
  } else if (response === 'BANNED') {
    enqueueSnackbar('You are banned.', { variant: 'error' })
  } else if (response === 'FAILURE') {
    enqueueSnackbar('There was a problem logging you in.', { variant: 'error' })
  } else if (response === 'ERRPASS') {
    enqueueSnackbar('Password entered is incorrect.', { variant: 'error' })
  } else if (response.details) {
    generateJoiError(response.details, enqueueSnackbar);
  } else {
    const accessCheck = setToken('access', response.tokens.accessToken);
    const refreshCheck = setToken('refresh', response.tokens.refreshToken);
    if (accessCheck && refreshCheck) {
      navigate('/');
      return response.user;
    }
  }
  return null;
}

async function logoutFn() {
  const { enqueueSnackbar, nowAwaiting, notAwaiting, navigate } = window;
  queryClient.clear();
  nowAwaiting();
  const success = await logout();
  notAwaiting();
  log(success);
  const checkClear = clearTokens();
  if (success === 'FAILURE' || !checkClear) {
    enqueueSnackbar('There was a problem logging you out.', { variant: 'error' });
  }
  navigate('/');
  return {};
}

async function loadUser() {
  const user = await getUser();
  if (user && user !== 'FORBIDDEN') {
    return user;
  }
  const newAccessToken = await refreshToken();
  if (newAccessToken && newAccessToken !== 'FORBIDDEN') {
    const checkAccess = setToken('access', newAccessToken);
    if (checkAccess) {
      const refetchUser = await getUser();
      if (refetchUser && refetchUser !== 'FORBIDDEN') {
        return refetchUser;
      }
    }
  }
  return null;
}

async function registerFn({ username, email, password, phoneNumber, anonymous, captcha }) {
  const { enqueueSnackbar, nowAwaiting, notAwaiting, navigate } = window;
  nowAwaiting()
  const response = await createAccount(username, email, password, phoneNumber, anonymous, captcha);
  notAwaiting();
  if (response === 'CAPTCHAFAILED') {
    enqueueSnackbar('Captcha failed to validate', { variant: 'error' })
  } else if (response === 'FAILURE') {
    enqueueSnackbar('There was a problem creating the account.', { variant: 'error' })
  } else if (response === 'ALREADYEXISTS') {
    enqueueSnackbar('That account already exists. Please use a unique username and email.', { variant: 'error' })
  } else if (response === 'ASYNCERROR') {
    enqueueSnackbar('The server could not process the request.', { variant: 'error' })
  } else if (response.details) {
    generateJoiError(response.details, enqueueSnackbar);
  } else {
    enqueueSnackbar('Created the account successfully! Check your email to verify it.', { variant: 'success' })
    navigate('/auth/login');
  }
  return;
}

const authConfig = {
  loadUser,
  loginFn,
  logoutFn,
  registerFn,
  LoaderComponent() {
    return (
      <LoadingPage />
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);