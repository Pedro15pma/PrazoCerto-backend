const express = require('express');
const schema = require('../validations/usuarios');
const service = require('../services/usuarios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const usuarios = await service.listarTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await service.obterPorId(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });
  try {
    const novoUsuario = await service.criar(value);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });
  try {
    const usuarioAtualizado = await service.atualizar(req.params.id, value);
    if (!usuarioAtualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const usuarioRemovido = await service.deletar(req.params.id);
    if (!usuarioRemovido) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover usuário' });
  }
});

module.exports = router;
