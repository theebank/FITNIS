const { Pool } = require("pg");

const pool = new Pool({
  user: "appdev",
  host: "localhost",
  database: "postgres",
  password: "pass123",
  port: 5432,
});

module.exports = {
  query: (text: any, params: any) => pool.query(text, params),
};
