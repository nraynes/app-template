const { PrismaClient } = require('@prisma/client');
const shell = require('shelljs');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const xss = require('xss-clean');
const { authLimiter, looseLimiter } = require('@/middlewares/rateLimiter');
const config = require('@/config/config');
const purgeTempKeys = require('@/middlewares/purgeTempKeys');
const routes = require('@/routes/index');
const logConnection = require('@/middlewares/logConnection');
const changeCaseParams = require('@/middlewares/changeCaseParams');

const prisma = new PrismaClient();

const app = express();

// Try connection to database.
const tryConnection = async (count = 0, success = 0) => {
  const wait = () => (new Promise((res) => setTimeout(res, 3000)));
  try {
    await prisma.$connect();
    if (success < 3) {
      console.log('.');
      await wait();
      tryConnection(count, success+1);
    } else {
      console.log('Connected to database...');
      try {
        console.log('Trying migration...');
        shell.exec('npx prisma migrate deploy');
        console.log('Migration complete!');
        try{
          await prisma.$disconnect();
          console.log('Database ready to accept connections...');
        } catch {
          console.log('Database suspended... Try restarting.');
        }
      } catch {
        console.log('Could not perform migration...');
      }
    }
  } catch {
    if (count < 5) {
      console.log('Could not connect to database. Retrying...');
      await wait();
      tryConnection(count+1);
    } else {
      console.log('Cannot connect to database. Retry count exceeded...');
    }
  }
};
(process.env.USE_HEROKU !== true) && tryConnection();

const defaultAllow = [
  'self',
  config.server,
  'data:',
  'https://www.google.com',
  'https://www.gstatic.com',
  'https://www.google-analytics.com',
  'https://7bbf-173-239-204-219.ngrok.io/',
];
// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': [...defaultAllow],
        'frame-src': [...defaultAllow],
        'img-src': [...defaultAllow],
        'connect-src': [...defaultAllow],
      },
    },
  }),
);

// parse json request body
app.use(express.json());

// Purge temp keys after every hour on api call.
app.use(purgeTempKeys());

// Change all params specified to lower or uppercase.
app.use(changeCaseParams());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

// log all connections
app.use(logConnection());

// Backend (i.e. API)
app.use('/api/', routes);

// serve static background
app.get('/background', looseLimiter, (req, res) => {
  res.header('Cross-Origin-Resource-Policy', '*');
  res.sendFile(path.resolve(__dirname, 'src', 'assets', 'images', config.backgroundPicture));
});

// Frontend (i.e. React)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.get('(/*)?', looseLimiter, (req, res) => {
  console.log('Accessed Frontend through Backend.');
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

module.exports = app;
