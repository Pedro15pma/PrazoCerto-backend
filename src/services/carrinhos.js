const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const carrinhoService = {
  async listarTodos() {
    const query = sql.select().from('carrinhos').orderBy('id_carrinho DESC');
    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql.select().from('carrinhos').where({ id_carrinho: id });
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('carrinhos', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('carrinhos', dados).where({ id_carrinho: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('carrinhos').where({ id_carrinho: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = carrinhoService;
