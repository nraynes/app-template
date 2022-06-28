const accounts = require('@/db/prisma/users');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedTable = async (list, tableName, id) => {
  console.log(`Seeding table ${tableName}...`)
  const idList = [];
  for (const item of list) {
    const returnItem = await prisma[tableName].create({
      data: item,
    });
    idList.push(returnItem[id]);
    console.log(`Created entry in ${tableName} with ID #: ${returnItem[id]}`);
  }
  return idList;
}

async function main() {
  console.log('Deleting current seed...');
  console.log('Deleting tokens...');
  await prisma.tokens.deleteMany({});
  console.log('Deleting email temp keys...');
  await prisma.email_temp_keys.deleteMany({});
  console.log('Deleting pass temp keys...');
  await prisma.pass_temp_keys.deleteMany({});
  console.log('Deleting accounts...');
  await prisma.accounts.deleteMany({});
  console.log('Start seeding ...');
  const accountIds = await seedTable(accounts, 'accounts', 'account_id')
  console.log('Seeding finished.');
}

const seedDatabase = () => {
  main()
    .catch((e) => {
      console.log('There was an Error Seeding...');
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = seedDatabase;

