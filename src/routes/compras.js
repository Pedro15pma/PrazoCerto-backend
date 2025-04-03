const express = require('express');
const schema = require('../validations/compra');
const service = require('../services/compra');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const compras = await service.listarTodas();
    res.json(compras);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar compras' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const compra = await service.obterPorId(req.params.id);
    if (!compra) return res.status(404).json({ erro: 'Compra não encontrada' });
    res.json(compra);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar compra' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novaCompra = await service.criar(value);
    res.status(201).json(novaCompra);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao registrar compra' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const compraAtualizada = await service.atualizar(req.params.id, value);
    if (!compraAtualizada) return res.status(404).json({ erro: 'Compra não encontrada' });
    res.json(compraAtualizada);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar compra' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const compraRemovida = await service.deletar(req.params.id);
    if (!compraRemovida) return res.status(404).json({ erro: 'Compra não encontrada' });
    res.json({ mensagem: 'Compra removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar compra' });
  }
});

module.exports = router;
