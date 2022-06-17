import acquire from '@/utils/core/acquire';

async function sendPasswordReset(email) {
  const response = await acquire({
    route: '/pass/forgotPassword',
    method: 'POST',
    body: {
      email,
    },
  })
  return response.content;
}

export default sendPasswordReset;
