import acquire from '@/utils/core/acquire';

async function changePassword(accountId, password) {
  const response = await acquire({
    route: '/pass/changePassword',
    method: 'PATCH',
    body: {
      accountId,
      password,
    },
  })
  return response.content;
}

export default changePassword;
