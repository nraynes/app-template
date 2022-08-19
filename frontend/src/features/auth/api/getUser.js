import acquire from '@/utils/core/acquire';

export const getUser = async () => {
  const response = await acquire({
    route: '/auth/me',
    method: 'GET',
    includeAuth: true,
  })
  return response.content;
};

export default getUser;
