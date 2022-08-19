import acquire from '@/utils/core/acquire';

async function removePhoto() {
  const response = await acquire({
    route: `/user/image`,
    method: 'DELETE',
    includeAuth: true,
  })
  return response.content;
}

export default removePhoto;