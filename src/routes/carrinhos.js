const express = require('express');
const schema = require('../validations/carrinhos');
const service = require('../services/carrinhos');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const carrinhos = await service.listarTodos();
    res.json(carrinhos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar carrinhos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carrinho = await service.obterPorId(req.params.id);
    if (!carrinho) return res.status(404).json({ erro: 'Carrinho não encontrado' });
    res.json(carrinho);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar carrinho' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novoCarrinho = await service.criar(value);
    res.status(201).json(novoCarrinho);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar carrinho' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const carrinhoAtualizado = await service.atualizar(req.params.id, value);
    if (!carrinhoAtualizado) return res.status(404).json({ erro: 'Carrinho não encontrado' });
    res.json(carrinhoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar carrinho' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const carrinhoRemovido = await service.deletar(req.params.id);
    if (!carrinhoRemovido) return res.status(404).json({ erro: 'Carrinho não encontrado' });
    res.json({ mensagem: 'Carrinho removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar carrinho' });
  }
});

module.exports = router;
