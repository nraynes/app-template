import acquire from '@/utils/core/acquire';

export const sendVerifyEmail = async (email) => {
  const response = await acquire({
    route: '/email/verify',
    method: 'POST',
    body: {
      email,
    }
  })
  return response.content;
};

export default sendVerifyEmail;
