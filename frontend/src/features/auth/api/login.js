import acquire from '@/utils/core/acquire';

export const loginWithUsernameAndPassword = async (email, password) => {
  const response = await acquire({
    route: '/auth/login',
    method: 'POST',
    body: {
      email,
      password,
    },
  })
  return response.content;
};

export default loginWithUsernameAndPassword;
