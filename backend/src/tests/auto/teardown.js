const accounts = require('./users');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < accounts.length; i++) {
    const userArr = await prisma.accounts.findMany({
      select: {
        account_id: true,
      },
      where: {
        email: accounts[i].email
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

const resetDatabase = () => {
  main()
    .catch((e) => {
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = resetDatabase;

