require("dotenv").config(); // Load environment variables from .env file
const fs = require("fs");

const {
  POSTGRESQL_DB_HOST,
  POSTGRESQL_DB_USER,
  POSTGRESQL_DB_PASSWORD,
  POSTGRESQL_DB,
} = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: POSTGRESQL_DB_USER,
      host: POSTGRESQL_DB_HOST,
      database: POSTGRESQL_DB,
      password: POSTGRESQL_DB_PASSWORD,
      port: 5432, // Default PostgreSQL port,
      ssl: {
        ca: fs.readFileSync("../Certificates/ap-south-1-bundle.pem").toString(),
      },
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};
