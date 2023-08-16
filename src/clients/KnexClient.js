require("dotenv").config();
const fs = require("fs");
const {
  POSTGRESQL_DB_HOST,
  POSTGRESQL_DB_USER,
  POSTGRESQL_DB_PASSWORD,
  POSTGRESQL_DB,
} = process.env;

const knex = require("knex")({
  client: "pg",
  connection: {
    user: POSTGRESQL_DB_USER,
    host: POSTGRESQL_DB_HOST,
    database: POSTGRESQL_DB,
    password: POSTGRESQL_DB_PASSWORD,
    port: 5432, // Default PostgreSQL port,
    ssl: {
      ca: fs
        .readFileSync(
          "F:/Arduino Pojects/Sketches/Home automation/Certificates/ap-south-1-bundle.pem"
        )
        .toString(),
    },
  },
});

module.exports = {
  db: knex,
};
