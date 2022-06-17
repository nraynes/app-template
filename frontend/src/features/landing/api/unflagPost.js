import acquire from '@/utils/core/acquire';

async function unflagPost(post_id) {
  const response = await acquire({
    route: '/post/unflag',
    method: 'PATCH',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default unflagPost;
