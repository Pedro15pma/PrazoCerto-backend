const express = require('express');
const schema = require('../validations/produtos');
const service = require('../services/produtos');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const produtos = await service.listarTodos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar produtos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const produto = await service.obterPorId(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novoProduto = await service.criar(value);
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const produtoAtualizado = await service.atualizar(req.params.id, value);
    if (!produtoAtualizado) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produtoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const produtoRemovido = await service.deletar(req.params.id);
    if (!produtoRemovido) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
});

module.exports = router;
