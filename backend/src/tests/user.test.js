const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);

process.env.NODE_ENV = 'test'

describe('USER', () => {

  describe('GET /info', () => {

    test('', async () => {



    })

  })

  describe('PATCH /info', () => {

    test('', async () => {



    })

  })

  describe('DELETE /delete', () => {

    test('', async () => {



    })

  })

})