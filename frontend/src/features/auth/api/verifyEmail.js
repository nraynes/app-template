import acquire from '@/utils/core/acquire';

export const verifyEmail = async (emailKey) => {
  const response = await acquire({
    route: '/email/verify',
    method: 'PATCH',
    body: {
      emailKey,
    }
  });
  return response.content;
};

export default verifyEmail;
