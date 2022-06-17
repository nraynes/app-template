import acquire from '@/utils/core/acquire';

async function editProfileInfo(username, email, phoneNumber, anonymous) {
  const response = await acquire({
    route: `/user/info`,
    method: 'PATCH',
    includeAuth: true,
    body: {
      username,
      email,
      phoneNumber,
      anonymous,
    },
  })
  return response.content;
}

export default editProfileInfo;
