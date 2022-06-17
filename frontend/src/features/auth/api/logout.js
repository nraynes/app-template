import acquire from '@/utils/core/acquire';

export const logout = async () => {
  const response = await acquire({
    route: '/auth/logout',
    method: 'DELETE',
    includeAuth: true,
  })
  return response.content;
};

export default logout;
