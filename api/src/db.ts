import { Pool, QueryResult } from "pg";

const pool = new Pool({
  user: "appdev",
  host: "localhost",
  database: "postgres",
  password: "pass123",
  port: 5432,
});

export const query = (
  text: string,
  params?: (string | number)[]
): Promise<QueryResult> => {
  return pool.query(text, params);
};
