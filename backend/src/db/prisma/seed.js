/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { PrismaClient } = require('@prisma/client');

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
  console.log('Start seeding ...');
  const accounts = [
    {
      email: 'johndoe@email.com',
      password_hash: '8KzhbqGTeBZpYo33aj/MygmH7upFUY/rq3C+8EwlHgf8zeqSFyVCalkB/YyFYIn3U46ArMWfsRbO2QGBCZxUB+9yBqWd67ZPmfXU5l6kVjm5M7pRdrCIqRZpiMUoNSSt',
      dynamic_salt: 'Ymr4OVGO/cyrxxSy',
      verified: true,
    },
    {
      email: 'bobfisher@email.com',
      password_hash: '5HDMqRyjVp4PrjqASYdWojzsOs0A/795GDpj+pxiQg5kJgwcOdkM4YyU7XczxBRdoYFTli908KldcetTTk+7tg3WFE/5duCwj1d0o7SPSkis09Ne7B9z8og9VwgmGfFX',
      dynamic_salt: 'LS5klDME2yxw7LEt',
      verified: true,
    },
    {
      email: 'markwhite@email.com',
      password_hash: 'MI8bBMAGfSyNdky1q7xgdl0hUpHMMdmpQVo0FDbACclIh9KtLE1FCWBWIIVOTCz2RvQ5/SmJyA5qaIr5JAlecdlML0fthlsS6sb9LzGB38s0bxykPAclZiR3wHbm2KKA',
      dynamic_salt: '3iQOJRbYx+SQC6Uk',
      verified: true,
    }
  ];
  const accountIds = await seedTable(accounts, 'accounts', 'account_id')
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.log('There was an Error Seeding...');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
