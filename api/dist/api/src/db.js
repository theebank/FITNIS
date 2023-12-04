"use strict";
const { Pool } = require("pg");
const pool = new Pool({
    user: "appdev",
    host: "localhost",
    database: "postgres",
    password: "pass123",
    port: 5432,
});
module.exports = {
    query: (text, params) => pool.query(text, params),
};
