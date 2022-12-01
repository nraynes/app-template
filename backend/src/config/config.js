const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const frontEndIsBeingTested = require('./frontEndTesting');

// Tell dotenv where to find the env file.
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Create validation schema and apply descriptions to environment variables.
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
    SECRET_STATIC_SALT: Joi.string().required().description('AES secret static salt'),
    SECRET_IV: Joi.string().required().description('AES secret IV'),
    SERVER_ADDRESS: Joi.string().required().description('Server address'),
  })
  .unknown();

// Validate the above schema.
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Set the front end url based on development or production environment.
let mainURL = '';
if (process.env.NODE_ENV === 'development') {
  mainURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  mainURL = process.env.USE_HEROKU == true ? 'https://raynesapptemplate.herokuapp.com' : envVars.SERVER_ADDRESS;
}

const config = {
  backgroundPicture: 'BeautifulLake.jpeg',
  env: envVars.NODE_ENV,
  frontEndTests: envVars.NODE_ENV !== 'production' ? frontEndIsBeingTested : false,
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
  useProfilePhoto: true,
  userPayloadKeys: ['account_id', 'email'],
  userAccountInfoKeys: ['email'],
  secretKey: envVars.SECRET_KEY,
  useEncryption: true,
  noMoreCredits: false,
  server: envVars.SERVER_ADDRESS,
  encryption: {
    config: {
      iv: envVars.SECRET_IV,
      v: 1,
      iter: 10000,
      ks: 128,
      ts: 64,
      mode: 'ccm',
      adata: '',
      cipher: 'aes',
      salt: envVars.SECRET_STATIC_SALT
    }
  }
};

if (config.useProfilePhoto) {
  config.userAccountInfoKeys.push('photo');
}

module.exports = config;
