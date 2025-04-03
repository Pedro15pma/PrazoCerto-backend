const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const estabelecimentoService = {
  async listarTodos() {
    const query = sql.select().from('estabelecimentos').orderBy('id_estabelecimento DESC');
    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql.select().from('estabelecimentos').where({ id_estabelecimento: id });
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('estabelecimentos', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('estabelecimentos', dados).where({ id_estabelecimento: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('estabelecimentos').where({ id_estabelecimento: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = estabelecimentoService;
