import acquire from '@/utils/core/acquire';

async function deletePost(post_id, post_content) {
  const response = await acquire({
    route: '/post/edit',
    method: 'PATCH',
    includeAuth: true,
    body: {
      post_id,
      post_content,
    }
  })
  return response.content;
}

export default deletePost;
