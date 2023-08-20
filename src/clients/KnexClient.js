require("dotenv").config();
const {
  POSTGRESQL_DB_HOST,
  POSTGRESQL_DB_USER,
  POSTGRESQL_DB_PASSWORD,
  POSTGRESQL_DB,
} = process.env;
const { POSTGRESQL_DB_SSL } = require("../constants/KnexConstants");

const knex = require("knex")({
  client: "pg",
  connection: {
    user: POSTGRESQL_DB_USER,
    host: POSTGRESQL_DB_HOST,
    database: POSTGRESQL_DB,
    port: 5432, // Default PostgreSQL port,
    password: POSTGRESQL_DB_PASSWORD,
    ssl: {
      ca: POSTGRESQL_DB_SSL,
    },
  },
});

module.exports = {
  db: knex,
};
