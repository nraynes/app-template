const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const userService = require('../services/user.service');
const passService = require('../services/pass.service');
const accounts = require('./auto/users');
const { useEncryption } = require('../config/config');
const { decrypt } = require("../utils/core/AES");

const emailOne = useEncryption ? decrypt(accounts[0].email) : accounts[0].email;
let code;
process.env.NODE_ENV = 'test'

describe('TEST', () => {

  describe('GET /emailTempCode', () => {

    test('Should respond with not found when provided with the wrong email.', async () => {
      const response = await request.get('/api/test/emailTempCode').query({
        email: 'johndope@email.com',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should respond with expired when provided with a correct email that has no saved valid email code.', async () => {
      const response = await request.get('/api/test/emailTempCode').query({
        email: emailOne,
      })
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('EXPIRED')
    })

    test('Should respond with success when provided with a correct email.', async () => {
      await request.post('/api/email/verify').send({
        email: emailOne,
      })
      const response = await request.get('/api/test/emailTempCode').query({
        email: emailOne,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toMatch(/.{32}/)
    })

  })

  describe('GET /passTempCode', () => {

    test('Should respond with not found when provided with the wrong email.', async () => {
      const response = await request.get('/api/test/passTempCode').query({
        email: 'johndope@email.com',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should respond with expired when provided with a correct email that has no saved valid pass code.', async () => {
      const user = await userService.getUserByEmail(emailOne)
      const key = await passService.getTempCodeByID(user.account_id)
      await passService.deleteKey(key.pass_key)
      const response = await request.get('/api/test/passTempCode').query({
        email: emailOne,
      })
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('EXPIRED')
    })

    test('Should respond with success when provided with a correct email.', async () => {
      await request.post('/api/pass/forgotPassword').send({
        email: emailOne,
      })
      const response = await request.get('/api/test/passTempCode').query({
        email: emailOne,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.pass_key).toMatch(/.{32}/)
    })

  })

})