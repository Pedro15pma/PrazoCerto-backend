const Joi = require('joi');

const carrinhoItemSchema = Joi.object({
  id_carrinho: Joi.number().integer().required(),
  id_produto: Joi.number().integer().required(),
  quantidade: Joi.number().integer().min(1).required(),
});

module.exports = carrinhoItemSchema;
