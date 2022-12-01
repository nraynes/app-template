const createPasswordHash = require('../../utils/core/createPasswordHash');
const { encrypt } = require('../../utils/core/AES');

const generateAccounts = async () => ([
  {
    email: encrypt('johndoe@email.com'),
    ...(await createPasswordHash('asdfASDF1')),
    verified: true,
  },
  {
    email: encrypt('bobfisher@email.com'),
    ...(await createPasswordHash('asdfASDF1')),
    verified: true,
  },
  {
    email: encrypt('markwhite@email.com'),
    ...(await createPasswordHash('asdfASDF1')),
    verified: false,
  }
]);

module.exports = generateAccounts;