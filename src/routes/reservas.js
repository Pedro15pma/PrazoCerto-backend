const express = require('express');
const schema = require('../validations/reserva');
const service = require('../services/reserva');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reservas = await service.listarTodas();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: `Erro ao listar reservas: ${err}` });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reserva = await service.obterPorId(req.params.id);
    if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada' });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar reserva' });
  }
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const novaReserva = await service.criar(value);
    res.status(201).json(novaReserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar reserva' });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });

  try {
    const reservaAtualizada = await service.atualizar(req.params.id, value);
    if (!reservaAtualizada) return res.status(404).json({ erro: 'Reserva não encontrada' });
    res.json(reservaAtualizada);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar reserva' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reservaRemovida = await service.deletar(req.params.id);
    if (!reservaRemovida) return res.status(404).json({ erro: 'Reserva não encontrada' });
    res.json({ mensagem: 'Reserva removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar reserva' });
  }
});

module.exports = router;
