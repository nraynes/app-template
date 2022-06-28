const supertest = require("supertest");
const app = require("../../app");
const seedDatabase = require('./auto/dbseed');
const request = supertest(app);

process.env.NODE_ENV = 'test'

seedDatabase();

describe('EMAIL', () => {

  describe('POST /verify', () => {

    test('Should create a verification code upon call.', async () => {

    })

  })

})