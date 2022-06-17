import acquire from '@/utils/core/acquire';

async function unreportPost(post_id) {
  const response = await acquire({
    route: '/post/unreport',
    method: 'DELETE',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default unreportPost;
