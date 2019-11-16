const Joi = require('joi');

const schema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = data => Joi.validate(data, schema);
