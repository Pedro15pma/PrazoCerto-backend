const express = require('express');
const schema = require('../validations/carrinhosItem');
const service = require('../services/carrinhosItem');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const itens = await service.listarTodos();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar itens do carrinho' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await service.obterPorId(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar item' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novoItem = await service.criar(value);
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar item ao carrinho' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const itemAtualizado = await service.atualizar(req.params.id, value);
    if (!itemAtualizado) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json(itemAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const itemRemovido = await service.deletar(req.params.id);
    if (!itemRemovido) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json({ mensagem: 'Item removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar item' });
  }
});

module.exports = router;
