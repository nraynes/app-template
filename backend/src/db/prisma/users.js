const sjcl = require('sjcl');
const { useEncryption, secretKey, encryption } = require('../../config/config');

const encrypt = (message) => {
  if (useEncryption) {
    const encrypted = sjcl.encrypt(secretKey, message, encryption.config);
    return JSON.parse(encrypted).ct;
  }
  return message;
}

const accounts = [
  {
    email: useEncryption ? encrypt('johndoe@email.com') : 'johndoe@email.com',
    password_hash: 'M834YbJlSuwCEER7fgnhy9NKoJm2fNYsomYoiG6zfOfWjD8tGxNdfKbcn+xPWdBkqewtcc+aVBH4YrCQslZ9joEywNGJy/s7auXyntvtv6ZsbvNW7rxVGFXnL7sbknc/',
    dynamic_salt: 'c31334c6e9ffe97bf7c35cb29a6b7f50',
    verified: true,
  },
  {
    email: useEncryption ? encrypt('bobfisher@email.com') : 'bobfisher@email.com',
    password_hash: 'kIIkfozPz631yhh5vzi7KvEiXYrI5FDJ0jZInROvEz/yx4T1jd9VJ+8jqSbAN6lgr756AyXg/CxBrwfAFCQw53kfSH0lpsRhLkXiFxpR2ralxSK//XvJBj0KXoTzCzMn',
    dynamic_salt: '8ba2505938bb251ff361376ebf556429',
    verified: true,
  },
  {
    email: useEncryption ? encrypt('markwhite@email.com') : 'markwhite@email.com',
    password_hash: 'lozftn3E85JET9KAhGum49Jj2UTKQEOJXOPeaaI1Xz5eukxbHDnqfoU6d1my6DyMQdh3cap0HmEYbCoWex/Fa07G+98BgffyuTVznpDWW1kRMXroHTPjGw0tt+1SZsW7',
    dynamic_salt: '45433333a6fd04d5ac29cd027f5e8cda',
    verified: false,
  }
];

module.exports = accounts;