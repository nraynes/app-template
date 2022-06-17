import acquire from '@/utils/core/acquire';

async function deletePost(post_id) {
  const response = await acquire({
    route: '/post/delete',
    method: 'DELETE',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default deletePost;
