/* eslint-disable consistent-return */
const Joi = require('joi');
const pick = require('@/utils/formatters/pick');
const respond = require('@/utils/core/respond');
const log = require('@/utils/misc/log');

const validate = (schema) => (req, res, next) => {
  log('Request Query:', req.query);
  log('Request Body:', req.body);
  log('Request Method:', req.method);
  // log('Request Headers:', req.headers);
  log('Request Url:', req.url);
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    respond(res, error, 400);
    return null;
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
