import acquire from '@/utils/core/acquire';

async function changePassword(passKey, password) {
  const response = await acquire({
    route: '/pass/changePassword',
    method: 'PATCH',
    body: {
      passKey,
      password,
    },
  })
  return response.content;
}

export default changePassword;
