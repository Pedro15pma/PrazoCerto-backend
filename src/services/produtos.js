const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const produtoService = {
  async listarTodos() {
    const query = sql.select().from('produtos').orderBy('id_produto DESC');
    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql.select().from('produtos').where({ id_produto: id });
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('produtos', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('produtos', dados).where({ id_produto: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('produtos').where({ id_produto: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = produtoService;
