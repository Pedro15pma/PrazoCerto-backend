const Joi = require('joi');

const produtoSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().allow('', null),
  imagem_path: Joi.string().allow('', null),
  preco_original: Joi.number().precision(2).required(),
  preco_desconto: Joi.number().precision(2).required(),
  validade: Joi.date().iso().required(),
  id_estabelecimento: Joi.number().integer().required(),
  quantidade_estoque: Joi.number().integer().min(0).required(),
});

module.exports = produtoSchema;
