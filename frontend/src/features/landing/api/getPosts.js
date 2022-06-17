import acquire from '@/utils/core/acquire';

async function getPosts(pageAmount, pageNumber, search, username, category_id, likes, account_id) {
  const response = await acquire({
    route: '/post/posts',
    method: 'GET',
    query: {
      pageAmount,
      pageNumber,
      search,
      username,
      category_id,
      likes,
      account_id
    }
  })
  return response.content;
}

export default getPosts;
