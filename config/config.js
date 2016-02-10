module.exports = {
  DATABASE_SCHEMA:  process.env.ACRO_DATABASE_SCHEMA  || 'db_acro',
  DATABASE_URL:     process.env.ACRO_DATABASE_URL     || 'postgres://localhost:5432',
  PORT:             process.env.ACRO_PORT             || 4000
};