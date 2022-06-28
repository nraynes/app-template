const supertest = require("supertest");
const app = require("../../app");
const seedDatabase = require('./auto/dbseed');
const request = supertest(app);

process.env.NODE_ENV = 'test'

seedDatabase();

// Cannot test register feature without front end integration. Successful registering will be tested with front end e2e test.
describe('AUTH', () => {

  describe('POST /register', () => {

    test('Should accept an email and password and fail with the wrong captcha.', async () => {
      const response = await request.post('/api/auth/register').send({
        email: 'test@email.com',
        password: 'asdfASDF1',
        captcha: 'test',
      })
      expect(response.statusCode).toBe(401);
      expect(response.body).toBe('CAPTCHAFAILED')
    })

    test('Should respond with a message to use non vulgar language when creating an email.', async () => {
      const response = await request.post('/api/auth/register').send({
        email: 'sexygirl@email.com',
        password: 'asdfASDF1',
        captcha: 'test',
      })
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: 'value must not contain inappropriate language',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
    })

    test('Should reject a request with any one of the fields missing.', async () => {
      const responseOne = await request.post('/api/auth/register').send({
        password: 'asdfASDF1',
        captcha: 'test',
      })
      const responseTwo = await request.post('/api/auth/register').send({
        email: 'test@email.com',
        captcha: 'test',
      })
      const responseThree = await request.post('/api/auth/register').send({
        email: 'test@email.com',
        password: 'asdfASDF1',
      })
      expect(responseOne.statusCode).toBe(400);
      expect(responseOne.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"email" is required',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
      expect(responseTwo.statusCode).toBe(400);
      expect(responseTwo.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"password" is required',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
      expect(responseThree.statusCode).toBe(400);
      expect(responseThree.body).toEqual(expect.objectContaining({
        _original: expect.any(Object),
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"captcha" is required',
            path: expect.any(Array),
            type: expect.any(String),
            context: expect.any(Object),
          })
        ])
      }))
    })

  })

  describe('POST /login', () => {

    test('Should accept an email and password and return a user object.', async () => {
      const response = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF1',
      })
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        user: {
          account_id: expect.any(Number),
          email: expect.any(String),
        },
        tokens: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      }))
    })

    test('Should respond with not found when provided with credentials that dont exist.', async () => {
      const response = await request.post('/api/auth/login').send({
        email: 'johndope@email.com',
        password: 'asdfASDF2',
      })
      expect(response.statusCode).toBe(404);
      expect(response.body).toBe('NOTFOUND')
    })

    test('Should respond with not verified when trying to log in to an unverified account.', async () => {
      const response = await request.post('/api/auth/login').send({
        email: 'markwhite@email.com',
        password: 'asdfASDF1',
      })
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('NOTVERIFIED')
    })

    test('Should respond with wrong password when trying to log in with the wrong password.', async () => {
      const response = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF2',
      })
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('ERRPASS')
    })

  })

  describe('GET /me', () => {
    
    test('Should return a user object when passing in a logged in users access token.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.get('/api/auth/me').set({ authorization: tokens.accessToken });
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        account_id: expect.any(Number),
        email: expect.any(String),
      }))
    })

    test('Should respond with forbidden when passing in an invalid token.', async () => {
      const response = await request.get('/api/auth/me').set({ authorization: 'Bearer test' });
      expect(response.statusCode).toBe(403)
      expect(response.body).toBe('FORBIDDEN')
    })

  })

  describe('POST /token', () => {

    test('Should provide an access token when passing in a valid refresh token.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.post('/api/auth/token').set({ authorization: tokens.refreshToken });
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.any(String))
    })

    test('Should respond with forbidden when passing in an invalid refresh token.', async () => {
      const response = await request.post('/api/auth/token').set({ authorization: 'Bearer test' });
      expect(response.statusCode).toBe(403)
      expect(response.body).toBe('FORBIDDEN')
    })

  })

  describe('DELETE /logout', () => {

    test('Should delete refresh token and respond with success upon call.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.delete('/api/auth/logout').set({ authorization: tokens.refreshToken });
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

    test('Should respond with failure upon recieving an invalid token.', async () => {
      const response = await request.delete('/api/auth/logout').set({ authorization: 'lasdjkfhakjlsdhfjkl' });
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('UNAUTHORIZED')
    })

  })

  describe('DELETE /logoutOfAllDevices', () => {

    test('Should return success upon providing a valid access token.', async () => {
      const userObj = await request.post('/api/auth/login').send({
        email: 'johndoe@email.com',
        password: 'asdfASDF1',
      })
      const { tokens } = userObj.body;
      const response = await request.delete('/api/auth/logoutOfAllDevices').set({ authorization: tokens.accessToken });
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('SUCCESS')
    })

    test('Should return unauthorized upon providing an invalid access token.', async () => {
      const response = await request.delete('/api/auth/logoutOfAllDevices').set({ authorization: 'kjhalksdhfkjhasdf' });
      expect(response.statusCode).toBe(401)
      expect(response.body).toBe('UNAUTHORIZED')
    })

  })

})