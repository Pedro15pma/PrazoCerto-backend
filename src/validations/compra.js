const Joi = require('joi');

const compraSchema = Joi.object({
  id_carrinho: Joi.number().integer().required(),
  id_usuario: Joi.number().integer().required(),
  valor_total: Joi.number().precision(2).required(),
  status: Joi.string().valid('realizada', 'cancelada').required(),
});

module.exports = compraSchema;
