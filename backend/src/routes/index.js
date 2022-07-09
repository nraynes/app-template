const express = require('express');
const authRoute = require('./auth.route');
const emailRoute = require('./email.route');
const passRoute = require('./pass.route');
const userRoute = require('./user.route');
const testRoute = require('./test.route');
const config = require('@/config/config');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
  {
    path: '/pass',
    route: passRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

if (config.frontEndTests || config.env === 'test') {
  defaultRoutes.push({
    path: '/test',
    route: testRoute,
  })
}

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
