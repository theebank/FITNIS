import { query } from "../db";

export const getNewPExericseID = async () => {
  try {
    const result = await query("SELECT COUNT(*) from programexercises");
    return Number(result.rows[0].count) + 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
