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
      password_hash: 'M834YbJlSuwCEER7fgnhy9NKoJm2fNYsomYoiG6zfOfWjD8tGxNdfKbcn+xPWdBkqewtcc+aVBH4YrCQslZ9joEywNGJy/s7auXyntvtv6ZsbvNW7rxVGFXnL7sbknc/',
      dynamic_salt: 'c31334c6e9ffe97bf7c35cb29a6b7f50',
      verified: true,
    },
    {
      email: 'bobfisher@email.com',
      password_hash: 'kIIkfozPz631yhh5vzi7KvEiXYrI5FDJ0jZInROvEz/yx4T1jd9VJ+8jqSbAN6lgr756AyXg/CxBrwfAFCQw53kfSH0lpsRhLkXiFxpR2ralxSK//XvJBj0KXoTzCzMn',
      dynamic_salt: '8ba2505938bb251ff361376ebf556429',
      verified: true,
    },
    {
      email: 'markwhite@email.com',
      password_hash: 'lozftn3E85JET9KAhGum49Jj2UTKQEOJXOPeaaI1Xz5eukxbHDnqfoU6d1my6DyMQdh3cap0HmEYbCoWex/Fa07G+98BgffyuTVznpDWW1kRMXroHTPjGw0tt+1SZsW7',
      dynamic_salt: '45433333a6fd04d5ac29cd027f5e8cda',
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
