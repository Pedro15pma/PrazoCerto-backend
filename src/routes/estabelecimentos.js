const express = require('express');
const schema = require('../validations/estabelecimento');
const service = require('../services/estabelecimento');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const estabelecimentos = await service.listarTodos();
    res.json(estabelecimentos);
  } catch (err) {
    res.status(500).json({ erro: `Erro ao listar estabelecimentos: ${err}` });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const estabelecimento = await service.obterPorId(req.params.id);
    if (!estabelecimento) return res.status(404).json({ erro: 'Estabelecimento não encontrado' });
    res.json(estabelecimento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar estabelecimento' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novoEstabelecimento = await service.criar(value);
    res.status(201).json(novoEstabelecimento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar estabelecimento' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const estabelecimentoAtualizado = await service.atualizar(req.params.id, value);
    if (!estabelecimentoAtualizado) return res.status(404).json({ erro: 'Estabelecimento não encontrado' });
    res.json(estabelecimentoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar estabelecimento' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const estabelecimentoRemovido = await service.deletar(req.params.id);
    if (!estabelecimentoRemovido) return res.status(404).json({ erro: 'Estabelecimento não encontrado' });
    res.json({ mensagem: 'Estabelecimento removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar estabelecimento' });
  }
});

module.exports = router;
