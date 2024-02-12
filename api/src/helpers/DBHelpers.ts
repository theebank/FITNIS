import { query } from "../db";

export const getNewID = async (table: string) => {
  try {
    const result = await query(`SELECT COUNT(*) FROM ${table}`);
    const newID = Number(result.rows[0].count) + 1;
    return newID;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
