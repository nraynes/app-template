const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const userService = require('../services/user.service');
const tempService = require('../services/temp.service');
const accounts = require('./auto/users');
const { decrypt } = require("../utils/core/AES");
const { useEncryption } = require('../config/config');

const emailThree = useEncryption ? decrypt(accounts[2].email) : accounts[2].email;

process.env.NODE_ENV = 'test'

describe('EMAIL', () => {

  describe('POST /verify', () => {

    test('Should create a verification code upon call.', async () => {
      const response = await request.post('/api/email/verify').send({
        email: emailThree,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

    test('Should respond with not found if an invalid email is given.', async () => {
      const response = await request.post('/api/email/verify').send({
        email: 'markbrown@email.com',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

  })

  describe('PATCH /verify', () => {

    test('Should respond with not found when the code is provided.', async () => {
      const response = await request.patch('/api/email/verify').send({
        emailKey: 'test',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should verify a user account when provided with the right code.', async () => {
      const user = await userService.getUserByEmail(emailThree)
      const code = await tempService.getEmailTokenByID(user.account_id);
      const response = await request.patch('/api/email/verify').send({
        emailKey: code,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
      // teardown
      await userService.unverifyUser(user.account_id);
    })

  })

})