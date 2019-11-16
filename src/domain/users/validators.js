const Joi = require('joi');

const createSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const createValidator = user => Joi.validate(user, createSchema);

const updateSchema = Joi.object().keys({
  userName: Joi.string().required(),
});

const updateValidator = user => Joi.validate(user, updateSchema);

module.exports = {
  createValidator,
  updateValidator,
};