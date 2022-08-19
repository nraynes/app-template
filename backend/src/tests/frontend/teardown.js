const main = require('../auto/teardown');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
