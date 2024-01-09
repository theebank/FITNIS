import { Pool, QueryResult } from "pg";
// import { queryType } from "../../types/QueryTypes";

const pool = new Pool({
  user: "appdev",
  host: "localhost",
  database: "postgres",
  password: "pass123",
  port: 5432,
});

// export const query = (text: string, params: any[]) => pool.query(text, params);

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};
