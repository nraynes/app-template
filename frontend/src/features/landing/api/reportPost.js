import acquire from '@/utils/core/acquire';

async function reportPost(post_id) {
  const response = await acquire({
    route: '/post/report',
    method: 'POST',
    includeAuth: true,
    body: {
      post_id,
    }
  })
  return response.content;
}

export default reportPost;
