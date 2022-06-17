import acquire from '@/utils/core/acquire';

async function likePost(post_id) {
  const response = await acquire({
    route: '/post/like',
    method: 'POST',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default likePost;
