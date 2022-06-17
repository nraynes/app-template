import acquire from '@/utils/core/acquire';

export const refreshToken = async () => {
  const response = await acquire({
    route: '/auth/token',
    method: 'POST',
    includeRefresh: true,
  })
  return response.content;
};

export default refreshToken;
