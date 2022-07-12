import acquire from '@/utils/core/acquire';

async function addPhoto(image) {
  const response = await acquire({
    route: `/user/image`,
    method: 'POST',
    includeAuth: true,
    body: {
      image,
    },
  })
  return response.content;
}

export default addPhoto;