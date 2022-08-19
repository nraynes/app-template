const { generateAccounts } = require('./users');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { encrypt } = require('../../utils/core/AES');

async function main() {
  const accounts = await generateAccounts();
  const emails = accounts.map((item) => item.email)
  emails.push(encrypt('test@email.com'))
  emails.push(encrypt('frontend@email.com'))
  emails.push(encrypt('newuseremail@email.com'))
  for (let i = 0; i < emails.length; i++) {
    const userArr = await prisma.accounts.findMany({
      select: {
        account_id: true,
      },
      where: {
        email: emails[i]
      }
    })
    if (userArr) {
      for (let j = 0; j < userArr.length; j++) {
        const curUser = userArr[j]
        await prisma.tokens.deleteMany({
          where: {
            account_id: curUser.account_id
          }
        })
        await prisma.email_temp_keys.deleteMany({
          where: {
            account_id: curUser.account_id
          }
        })
        await prisma.pass_temp_keys.deleteMany({
          where: {
            account_id: curUser.account_id
          }
        })
        await prisma.accounts.deleteMany({
          where: {
            account_id: curUser.account_id
          }
        })
      }
    }
  }
}

const resetDatabase = () => (
  main()
    .catch((e) => {
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    })
)

module.exports = resetDatabase;

