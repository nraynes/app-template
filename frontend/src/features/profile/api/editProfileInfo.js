import acquire from '@/utils/core/acquire';

async function editProfileInfo(email) {
  const response = await acquire({
    route: `/user/info`,
    method: 'PATCH',
    includeAuth: true,
    body: {
      email,
    },
  })
  return response.content;
}

export default editProfileInfo;
