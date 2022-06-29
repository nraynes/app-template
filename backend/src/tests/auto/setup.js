const accounts = require('./users');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedTable = async (list, tableName, id) => {
  const idList = [];
  for (const item of list) {
    const returnItem = await prisma[tableName].create({
      data: item,
    });
    idList.push(returnItem[id]);
  }
  return idList;
}

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
  await seedTable(accounts, 'accounts', 'account_id')
}

const seedDatabase = () => {
  main()
    .catch((e) => {
      process.exit(1);
    })
}

module.exports = seedDatabase;

