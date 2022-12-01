/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  jest: {
    configure: {
      roots: ['<rootDir>/src', '<rootDir>/src/tests'],
      testMatch: ['<rootDir>/src/tests/*.{test}.{js}'],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  eslint: {
    enable: false,
  },
};
