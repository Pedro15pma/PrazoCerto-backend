const sql = require('sql-bricks-postgres');
const pool = require('../config/db');

const usuarioService = {
  async listarTodos() {
    const query = sql
      .select(
        'usuarios.*',
        'estabelecimentos.id_estabelecimento AS estabelecimento_id',
        'estabelecimentos.nome AS estabelecimento_nome',
        'estabelecimentos.descricao AS estabelecimento_descricao',
        'estabelecimentos.endereco AS estabelecimento_endereco',
        'estabelecimentos.telefone AS estabelecimento_telefone'
      )
      .from('usuarios')
      .leftJoin('estabelecimentos', 'usuarios.id_usuario = estabelecimentos.id_usuario')
      .orderBy('usuarios.id_usuario DESC');

    const { rows } = await pool.query(query.toParams());
    return rows;
  },

  async obterPorId(id) {
    const query = sql
      .select(
        'usuarios.*',
        'estabelecimentos.id_estabelecimento AS estabelecimento_id',
        'estabelecimentos.nome AS estabelecimento_nome',
        'estabelecimentos.descricao AS estabelecimento_descricao',
        'estabelecimentos.endereco AS estabelecimento_endereco',
        'estabelecimentos.telefone AS estabelecimento_telefone'
      )
      .from('usuarios')
      .leftJoin('estabelecimentos', 'usuarios.id_usuario = estabelecimentos.id_usuario')
      .where({ 'usuarios.id_usuario': id });

    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async criar(dados) {
    const query = sql.insert('usuarios', dados).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0];
  },

  async atualizar(id, dados) {
    const query = sql.update('usuarios', dados).where({ id_usuario: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },

  async deletar(id) {
    const query = sql.delete().from('usuarios').where({ id_usuario: id }).returning('*');
    const { rows } = await pool.query(query.toParams());
    return rows[0] || null;
  },
};

module.exports = usuarioService;
