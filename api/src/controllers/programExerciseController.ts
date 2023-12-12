import { Request, Response } from "express";
const db = require("../db");

export const getNewPExericseID = async () => {
  try {
    let result = await db.query("SELECT COUNT(*) from programexercises");
    return Number(result.rows[0].count) + 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
