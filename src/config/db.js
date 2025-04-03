const { Pool } = require('pg');
const senhaCodificada = encodeURIComponent('U-abjbNXGrPT7?v');
const DATABASE_URL = `postgresql://postgres.pszuaetwtgxturpykkwo:${senhaCodificada}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
