/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
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
  console.log('Erasing finished...');
}

main()
  .catch((e) => {
    console.log('There was an Error Erasing...');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
