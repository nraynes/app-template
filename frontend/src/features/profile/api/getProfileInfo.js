import acquire from '@/utils/core/acquire';

async function getProfileInfo() {
  const response = await acquire({
    route: `/user/info`,
    method: 'GET',
    includeAuth: true,
  })
  return response.content;
}

export default getProfileInfo;
