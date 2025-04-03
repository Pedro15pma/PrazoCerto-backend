const { Pool } = require('pg');
const dns = require('dns');

const senhaCodificada = encodeURIComponent('U-abjbNXGrPT7?v');

const pool = new Pool({
  connectionString: `postgresql://postgres:${senhaCodificada}@db.pszuaetwtgxturpykkwo.supabase.co:5432/postgres`,
  ssl: {
    rejectUnauthorized: false,
  },
  // Força uso de IPv4 (impede ENETUNREACH ao usar Supabase via Railway)
  dnsLookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },
});

module.exports = pool;
