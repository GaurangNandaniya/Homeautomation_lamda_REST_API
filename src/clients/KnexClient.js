require("dotenv").config();
const {
  POSTGRESQL_DB_HOST,
  POSTGRESQL_DB_USER,
  POSTGRESQL_DB_PASSWORD,
  POSTGRESQL_DB,
  ENDPOINT_ID,
} = process.env;
const { POSTGRESQL_DB_SSL } = require("../constants/KnexConstants");

const knex = require("knex")({
  client: "pg",
  connection: {
    user: POSTGRESQL_DB_USER,
    host: POSTGRESQL_DB_HOST,
    database: POSTGRESQL_DB,
    password: POSTGRESQL_DB_PASSWORD,
    port: 5432, // Default PostgreSQL port,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  db: knex,
};
