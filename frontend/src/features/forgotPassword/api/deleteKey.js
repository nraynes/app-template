import acquire from '@/utils/core/acquire';

async function deleteKey(code) {
  const response = await acquire({
    route: '/pass/tempCode',
    method: 'DELETE',
    body: {
      code,
    },
  });
  return response.content;
}

export default deleteKey;
