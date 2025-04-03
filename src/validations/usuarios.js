const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha_hash: Joi.string().required(),
  tipo_usuario: Joi.string().valid('admin', 'consumidor', 'estabelecimento').required(),
});

module.exports = usuarioSchema;
