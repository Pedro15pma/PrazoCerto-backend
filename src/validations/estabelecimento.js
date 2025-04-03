const Joi = require('joi');

const estabelecimentoSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().allow('', null),
  endereco: Joi.string().allow('', null),
  telefone: Joi.string().allow('', null),
});

module.exports = estabelecimentoSchema;
