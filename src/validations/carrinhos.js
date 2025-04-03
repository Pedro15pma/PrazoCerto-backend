const Joi = require('joi');

const carrinhoSchema = Joi.object({
  id_usuario: Joi.number().integer().required(),
  status: Joi.string().valid('aberto', 'fechado', 'cancelado').required(),
});

module.exports = carrinhoSchema;
