import acquire from '@/utils/core/acquire';

async function createAccount(email, password, captcha) {
  const response = await acquire({
    route: '/auth/register',
    method: 'POST',
    body: {
      email,
      password,
      captcha
    },
  });
  return response.content;
}

export default createAccount;
