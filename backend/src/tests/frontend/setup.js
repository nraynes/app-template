const main = require('../auto/setup');

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

