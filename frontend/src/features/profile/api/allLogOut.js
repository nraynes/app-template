import acquire from '@/utils/core/acquire';

async function logOutOfAllDevices() {
  const response = await acquire({
    route: '/auth/logoutOfAllDevices',
    method: 'DELETE',
    includeAuth: true,
  });
  return response.content;
}

export default logOutOfAllDevices;
