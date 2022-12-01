const Joi = require('joi');
const pick = require('@/utils/formatters/pick');
const respond = require('@/utils/core/respond');

// This will take the req and a validation schema and check to see if the req matches the schema
// as it is described in the validation file.
const validate = (schema) => (req, res, next) => {
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
