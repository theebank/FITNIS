"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "appdev",
    host: "localhost",
    database: "postgres",
    password: "pass123",
    port: 5432,
});
const query = (text, params) => {
    return pool.query(text, params);
};
exports.query = query;
