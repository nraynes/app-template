const createPasswordHash = require('../../utils/core/createPasswordHash');
const { encrypt } = require('../../utils/core/AES');
const testPicture = require('./picture');

const accounts = [
  encrypt('amydavis@email.com'),
  encrypt('jamesbrown@email.com'),
  encrypt('paulblart@email.com'),
  encrypt('maxmiller@email.com')
]

const generateAccounts = async () => ([
  {
    email: accounts[0],
    ...(await createPasswordHash('asdfASDF1')),
    verified: true,
    photo: testPicture,
  },
  {
    email: accounts[1],
    ...(await createPasswordHash('asdfASDF1')),
    verified: true,
  },
  {
    email: accounts[2],
    ...(await createPasswordHash('asdfASDF1')),
    verified: false,
  },
  {
    email: accounts[3],
    ...(await createPasswordHash('asdfASDF1')),
    verified: true,
  }
]);

module.exports = {
  accounts,
  generateAccounts,
};