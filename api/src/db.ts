import { Pool } from "pg";

const pool = new Pool({
  user: "appdev",
  host: "localhost",
  database: "postgres",
  password: "pass123",
  port: 5432,
});

export const query = (text: any, params: any) => pool.query(text, params);
