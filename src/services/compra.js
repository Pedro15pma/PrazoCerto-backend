const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const compraService = {
  async listarTodas() {
    const query = sql.select().from('compras').orderBy('id_compra DESC');
    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql.select().from('compras').where({ id_compra: id });
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('compras', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('compras', dados).where({ id_compra: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('compras').where({ id_compra: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = compraService;
