import acquire from '@/utils/core/acquire';

async function deleteUser() {
  const response = await acquire({
    route: '/user/delete',
    method: 'DELETE',
    includeAuth: true,
  });
  return response.content;
}

export default deleteUser;
