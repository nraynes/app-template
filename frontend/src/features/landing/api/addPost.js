import acquire from '@/utils/core/acquire';

async function getPosts(post_content, category_id) {
  const response = await acquire({
    route: '/post/new',
    method: 'POST',
    includeAuth: true,
    body: {
      post_content,
      category_id,
    }
  })
  return response.content;
}

export default getPosts;
