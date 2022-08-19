const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const { accounts } = require('./auto/users');
const { decrypt } = require("../utils/core/AES");
const { useProfilePhoto } = require('../config/config');

const emailTwo = decrypt(accounts[1])
const emailFour = decrypt(accounts[3])

process.env.NODE_ENV = 'test'

describe('USER', () => {

  describe('POST /image', () => {

    test('Should save an image to account and provide success.', async () => {
      if (useProfilePhoto) {
        const userObj = await request.post('/api/auth/login').send({
          email: emailTwo,
          password: 'asdfASDF1',
        })
        const { tokens } = userObj.body;
        const response = await request.post('/api/user/image').set({ authorization: tokens.accessToken }).send({
          image: 'Test Image'
        });
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual('SUCCESS')
      }
    })

  })

  describe('GET /info', () => {

    test('Should provide unauthorized when giving the wrong token.', async () => {
      const response = await request.get('/api/user/info').set({ authorization: 'Bearer test' });
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('UNAUTHORIZED')
    })
    
    test('Should provide the users email and photo if specified in config upon giving a correct token.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: emailTwo,
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.get('/api/user/info').set({ authorization: tokens.accessToken });
      expect(response.statusCode).toBe(200)
      const expected = {
        email: emailTwo,
      }
      if (useProfilePhoto) {
        expected.photo = 'Test Image';
      }
      expect(response.body).toEqual(expect.objectContaining(expected))
    })

  })

  describe('DELETE /image', () => {
    
    test('Should delete the photo and provide a success response.', async () => {
      if (useProfilePhoto) {
        const userObj = await request.post('/api/auth/login').send({
          email: emailTwo,
          password: 'asdfASDF1',
        })
        const { tokens } = userObj.body;
        const response = await request.delete('/api/user/image').set({ authorization: tokens.accessToken });
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual('SUCCESS')
        const responseTwo = await request.get('/api/user/info').set({ authorization: tokens.accessToken });
        expect(responseTwo.statusCode).toBe(200)
        expect(responseTwo.body).toEqual(expect.objectContaining({
          email: emailTwo,
          photo: null
        }))
      }
    })
    
  })

  describe('PATCH /info', () => {

    test('Should provide unauthorized when giving the wrong token.', async () => {
      const response = await request.patch('/api/user/info').set({ authorization: 'Bearer test' }).send({
        email: 'test@email.com'
      });
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('UNAUTHORIZED')
    })
    
    test('Should provide success upon giving a correct token and a different email and user should not be verified.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: emailTwo,
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.patch('/api/user/info').set({ authorization: tokens.accessToken }).send({
        email: 'test@email.com'
      });
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual('SUCCESS')
      const testObj = await request.post('/api/auth/login').send({
        email: 'test@email.com',
        password: 'asdfASDF1',
      })
      expect(testObj.statusCode).toBe(400)
      expect(testObj.body).toBe('NOTVERIFIED')
    })

  })
  
  describe('DELETE /delete', () => {
  
    test('Should respond with unauthorized after recieving the wrong token.', async () => {
      const response = await request.delete('/api/user/delete').set({ authorization: 'Bearer test' })
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('UNAUTHORIZED')
    })
  
    test('Should respond with success after deleting an account.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: emailFour,
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.delete('/api/user/delete').set({ authorization: tokens.accessToken })
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
      const userObjCheck = await request.post('/api/auth/login').send({
        email: emailFour,
        password: 'asdfASDF1',
      })
      expect(userObjCheck.statusCode).toBe(404)
      expect(userObjCheck.body).toBe('NOTFOUND')
    })
  
  })

})