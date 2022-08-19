import acquire from '@/utils/core/acquire';

async function validateCode(code) {
  const response = await acquire({
    route: `/pass/tempCode`,
    method: 'GET',
    query: {
      code,
    }
  })
  return response.content;
}

export default validateCode;
