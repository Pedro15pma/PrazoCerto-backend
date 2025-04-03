const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const carrinhoItemService = {
  async listarTodos() {
    const query = sql.select().from('carrinhos_itens').orderBy('id_carrinho_item DESC');
    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql.select().from('carrinhos_itens').where({ id_carrinho_item: id });
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('carrinhos_itens', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('carrinhos_itens', dados).where({ id_carrinho_item: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('carrinhos_itens').where({ id_carrinho_item: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = carrinhoItemService;
