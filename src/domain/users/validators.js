const Joi = require('joi');

const createSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const createValidator = user => Joi.validate(user, createSchema);

module.exports = { createValidator };