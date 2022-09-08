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

const app = express();

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        "frame-src": ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        "img-src": ["'self'", 'data:', "https://www.google.com", "https://www.gstatic.com"],
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

// log all connections
app.use(logConnection());

// limit repeated failed requests to endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

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
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

module.exports = app;
