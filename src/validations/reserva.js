const Joi = require('joi');

const reservaSchema = Joi.object({
  id_usuario: Joi.number().integer().required(),
  id_produto: Joi.number().integer().required(),
  status: Joi.string().valid('reservado', 'cancelado', 'retirado').required(),
});

module.exports = reservaSchema;
