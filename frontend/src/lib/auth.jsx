import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import { queryClient } from './react-query';
import LoadingPage from '@/components/LoadingPage';
import { setToken, clearTokens } from '@/utils/browser/tokens';
import getUser from '@/features/auth/api/getUser';
import loginWithEmailAndPassword from '@/features/auth/api/login';
import logout from '@/features/auth/api/logout';
import refreshToken from '@/features/auth/api/refreshTokens';
import createAccount from '@/features/auth/api/createAccount';
import sendVerifyEmail from '@/features/auth/api/sendVerifyEmail';
import verifyEmail from '@/features/auth/api/verifyEmail';
import apiCall from '@/utils/core/apiCall';

export async function verifyEmailWithKey(emailVerificationCode) {
  if (emailVerificationCode) {
    await apiCall(() => verifyEmail(emailVerificationCode), {
      SUCCESS: 'Your email has been successfully verified!',
      EXPIRED: 'The email verification token has expired. Please try to log in to resend a new token',
      NOTFOUND: 'The email verification token could not be found. Please try to log in to resend a new token',
    })
  }
};

async function sendVerificationEmail(email) {
  const { ask } = window;
  ask('Not Verified', 'Your account is not verified. Would you like to resend the verification email?', async (answer) => {
    if (answer) {
      await apiCall(() => sendVerifyEmail(email), {
        SUCCESS: 'Verification email has been sent!',
        NOTFOUND: 'Could not send verification email as account does not exist',
      })
    }
  })
}

async function loginFn({ email, password }) {
  const { navigate } = window;
  return await apiCall(() => loginWithEmailAndPassword(email, password), {
    SUCCESS: (response) => {
      const accessCheck = setToken('access', response.tokens.accessToken);
      const refreshCheck = setToken('refresh', response.tokens.refreshToken);
      if (accessCheck && refreshCheck) {
        navigate('/');
        return response.user;
      }
    },
    NOTVERIFIED: () => sendVerificationEmail(email),
    NOTFOUND: 'There was no user matching those credentials',
    ERRPASS: 'Password entered is incorrect',
  })
}

async function logoutFn() {
  const { enqueueSnackbar, nowAwaiting, notAwaiting, navigate } = window;
  queryClient.clear();
  nowAwaiting();
  const success = await logout();
  notAwaiting();
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
  clearTokens();
  return null;
}

async function registerFn({ email, password, captcha }) {
  const { enqueueSnackbar, navigate } = window;
  await apiCall(() => createAccount(email, password, captcha), {
    SUCCESS: () => {
      enqueueSnackbar('Created the account successfully! Check your email to verify it.', { variant: 'success' })
      navigate('/auth/login')
    },
    CAPTCHAFAILED: 'Captcha failed to validate',
    ALREADYEXISTS: 'That account already exists',
  });
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