const supertest = require("supertest");
const app = require("../../../app");
const request = supertest(app)

describe('AUTH', () => {
  describe('POST /register', () => {
    test('Should accept an email and password but fail with an invalid captcha', async () => {
      const response = await request.post('/api/auth/register').send({
        email: 'test@email.com',
        password: 'asdfASDF1',
        captcha: 'test',
      })
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('CAPTCHAFAILED')
    })
  })
})