const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    STATIC_SALT: Joi.string().required().description('static salt for use in password hashing'),
    JWT_ACCESS_SECRET: Joi.string().required().description('JWT access secret key'),
    JWT_REFRESH_SECRET: Joi.string().required().description('JWT refresh secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    SENDGRID_API_KEY: Joi.string().required().description('SendGrid Api Key'),
    APP_EMAIL: Joi.string().required().email().description('Paladin Official Email Address'),
    RECAPTCHA_SECRET_KEY: Joi.string().required().description('Google recaptcha secrete'),
    SECRET_KEY: Joi.string().required().description('AES secret key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

let mainURL = '';
if (process.env.NODE_ENV === 'development') {
  mainURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  mainURL = 'https://raynesapptemplate.herokuapp.com';
}

module.exports = {
  backgroundPicture: 'BeautifulLake.jpeg',
  env: envVars.NODE_ENV,
  jwt: {
    accessSecret: envVars.JWT_ACCESS_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  static: {
    salt: envVars.STATIC_SALT,
  },
  recaptcha: {
    secret: envVars.RECAPTCHA_SECRET_KEY
  },
  sendGrid: {
    apiKey: envVars.SENDGRID_API_KEY,
  },
  app: {
    email: envVars.APP_EMAIL,
  },
  defaultURL: mainURL,
  tempCodeExpiration: 2,
  userPayloadKeys: ['account_id'],
  userAccountInfoKeys: ['email'],
  secretKey: envVars.SECRET_KEY,
  useEncryption: true,
};
