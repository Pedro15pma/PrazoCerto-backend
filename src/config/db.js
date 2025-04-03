const { Pool } = require('pg');

const senhaCodificada = encodeURIComponent('U-abjbNXGrPT7?v');

const pool = new Pool({
  connectionString: `postgresql://postgres:${senhaCodificada}@db.pszuaetwtgxturpykkwo.supabase.co:5432/postgres`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
