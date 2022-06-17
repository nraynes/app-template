import acquire from '@/utils/core/acquire';

async function checkPost(post_content) {
  const response = await acquire({
    route: '/post/check',
    method: 'GET',
    includeAuth: true,
    query: {
      post_content,
    }
  })
  return response.content;
}

export default checkPost;
