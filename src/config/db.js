const { Pool } = require('pg');

require('dotenv').config();

const DATABASE = encodeURIComponent(process.env.DATABASE)

const pool = new Pool({
  connectionString: `postgresql://postgres.pszuaetwtgxturpykkwo:${DATABASE}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
