/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const userService = require('../services/user.service');
const passService = require('../services/pass.service');
const { accounts } = require('./auto/users');
const { decrypt } = require('../utils/core/AES');

const emailOne = decrypt(accounts[0]);
let code;
process.env.NODE_ENV = 'test';

describe('PASS', () => {

  describe('POST /forgotPassword', () => {

    test('Should respond with not found when provided with the wrong email.', async () => {
      const response = await request.post('/api/pass/forgotPassword').send({
        email: 'johndope@email.com',
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toBe('NOTFOUND');
    });

    test('Should respond with success when provided with a correct email.', async () => {
      const response = await request.post('/api/pass/forgotPassword').send({
        email: emailOne,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('SUCCESS');
    });

  });

  describe('GET /tempCode', () => {

    test('Should return with success when providing the right code.', async () => {
      const user = await userService.getUserByEmail(emailOne);
      code = await passService.getTempCodeByID(user.account_id);
      const response = await request.get('/api/pass/tempCode').query({
        code: code.pass_key,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('SUCCESS');
    });

    test('Should respond with not valid when an invalid code is given.', async () => {
      const response = await request.get('/api/pass/tempCode').query({
        code: 'test',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('NOTVALID');
    });

    test('Should respond with error when given the no input.', async () => {
      const response = await request.get('/api/pass/tempCode');
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            // eslint-disable-next-line no-useless-escape
            message: '\"code\" is required',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }));
    });

    test('Should respond with error when given the wrong type input.', async () => {
      const response = await request.get('/api/pass/tempCode').query({
        code: { test: 442 },
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            // eslint-disable-next-line no-useless-escape
            message: '\"code\" must be a string',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }));
    });

  });

  describe('PATCH /changePassword', () => {

    test('Should respond with expired when given the wrong pass key.', async () => {
      const response = await request.patch('/api/pass/changePassword').send({
        passKey: 'test',
        password: 'asdfASDF1'
      });
      expect(response.statusCode).toBe(401);
      expect(response.body).toBe('EXPIRED');
    });

    test('Should respond with success upon resetting user password.', async () => {
      const response = await request.patch('/api/pass/changePassword').send({
        passKey: code.pass_key,
        password: 'asdfASDF1'
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('SUCCESS');
    });

  });

  describe('DELETE /tempCode', () => {

    test('Should provide success even upon giving a code that is not there.', async () => {
      const response = await request.delete('/api/pass/tempCode').send({
        code: 'test',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('SUCCESS');
    });

    test('Should delete a temp code upon call and provide success.', async () => {
      const response = await request.delete('/api/pass/tempCode').send({
        code: code.pass_key,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('SUCCESS');
    });

  });

});