const accounts = require('./users');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sjcl = require('sjcl');
const { useEncryption, secretKey, encryption } = require('../../config/config');

const encrypt = (message) => {
  if (useEncryption) {
    const encrypted = sjcl.encrypt(secretKey, message, encryption.config);
    return JSON.parse(encrypted).ct;
  }
  return message;
}

const emails = accounts.map((item) => item.email)
emails.push(useEncryption ? encrypt('test@email.com') : 'test@email.com',)
emails.push(useEncryption ? encrypt('frontend@email.com') : 'frontend@email.com',)


async function main() {
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

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
