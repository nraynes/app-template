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

describe('PASS', () => {

  describe('POST /forgotPassword', () => {

    test('Should respond with not found when provided with the wrong email.', async () => {
      const response = await request.post('/api/pass/forgotPassword').send({
        email: 'johndope@email.com',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should respond with success when provided with a correct email.', async () => {
      const response = await request.post('/api/pass/forgotPassword').send({
        email: emailOne,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

  })

  describe('GET /tempCode', () => {

    test('Should provide an account id when providing the right code.', async () => {
      const user = await userService.getUserByEmail(emailOne)
      code = await passService.getTempCodeByID(user.account_id);
      const response = await request.get('/api/pass/tempCode').query({
        code: code.pass_key,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe(user.account_id)
    })

    test('Should respond with not valid when an invalid code is given.', async () => {
      const response = await request.get('/api/pass/tempCode').query({
        code: 'test',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body).toBe('NOTVALID')
    })

    test('Should respond with error when given the no input.', async () => {
      const response = await request.get('/api/pass/tempCode')
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '\"code\" is required',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
    })

    test('Should respond with error when given the wrong type input.', async () => {
      const response = await request.get('/api/pass/tempCode').query({
        code: { test: 442 },
      })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '\"code\" must be a string',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
    })

  })

  describe('PATCH /changePassword', () => {

    test('Should respond with not found upon recieving wrong user id.', async () => {
      const response = await request.patch('/api/pass/changePassword').send({
        accountId: 1,
        password: 'asdfASDF1'
      });
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should respond with success upon resetting user password.', async () => {
      const user = await userService.getUserByEmail(emailOne)
      const response = await request.patch('/api/pass/changePassword').send({
        accountId: user.account_id,
        password: 'asdfASDF1'
      });
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

  })

  describe('DELETE /tempCode', () => {

    test('Should provide success even upon giving a code that is not there.', async () => {
      const response = await request.delete('/api/pass/tempCode').send({
        code: 'test',
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

    test('Should delete a temp code upon call and provide success.', async () => {
      const response = await request.delete('/api/pass/tempCode').send({
        code: code.pass_key,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

  })

})