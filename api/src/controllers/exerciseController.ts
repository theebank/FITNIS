import { Request, Response } from "express";

import { query } from "../db";
import { exerciseType } from "../../../types/QueryReturnTypes";

export const getExerciseByID = async (req: Request, res: Response) => {
  try {
    const exercise = await getExerciseDetailsByID(
      Number(req.params.exerciseId)
    );
    res.send(exercise);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

export const getExerciseDetailsByID = async (workoutId: number) => {
  try {
    const result = await query(
      "SELECT * FROM exercises where exerciseid = $1",
      [workoutId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};
export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM exercises");
    res.send(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
export const getAllExerciseTypes = async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT muscletype FROM exercises UNION SELECT UNNEST(othermusclesworked) FROM exercises"
    );
    let rows = result.rows.filter(
      (exercise: exerciseType) => exercise.muscletype !== ""
    );
    rows = rows.map((exercise: exerciseType) => exercise.muscletype);
    res.send(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
