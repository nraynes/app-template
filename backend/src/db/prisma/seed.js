const { PrismaClient } = require('@prisma/client');
const accounts = require('./users');
const log = require('../../utils/misc/log');

const seedTable = async (list, tableName, id) => {
  log(`Seeding table ${tableName}...`)
  const idList = [];
  for (const item of list) {
    const returnItem = await prisma[tableName].create({
      data: item,
    });
    idList.push(returnItem[id]);
    log(`Created entry in ${tableName} with ID #: ${returnItem[id]}`);
  }
  return idList;
}

const prisma = new PrismaClient();
async function main() {
  log('Deleting current seed...');
  log('Deleting tokens...');
  await prisma.tokens.deleteMany({});
  log('Deleting email temp keys...');
  await prisma.email_temp_keys.deleteMany({});
  log('Deleting pass temp keys...');
  await prisma.pass_temp_keys.deleteMany({});
  log('Deleting accounts...');
  await prisma.accounts.deleteMany({});
  log('Start seeding ...');
  const accountIds = await seedTable(accounts, 'accounts', 'account_id')
  log('Seeding finished.');
}

main()
  .catch((e) => {
    log('There was an Error Seeding...');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
