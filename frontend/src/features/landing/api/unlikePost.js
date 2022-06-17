import acquire from '@/utils/core/acquire';

async function unlikePost(post_id) {
  const response = await acquire({
    route: '/post/unlike',
    method: 'DELETE',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default unlikePost;
