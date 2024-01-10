import { Request, Response } from "express";
import { getExerciseDetailsByID } from "./exerciseController";
import { getNewPExericseID } from "./programExerciseController";

import { query } from "../db";
import { exerciseType } from "../../../types/QueryReturnTypes";

export const getWorkoutByID = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM workouts where workoutid = $1", [
      req.params.workoutId,
    ]);
    const workout = result.rows[0];
    workout["exercises"] = await getWorkoutDetails(
      Number(req.params.workoutId)
    );
    workout["exercises"] = await Promise.all(
      workout["exercises"].map(async (exercise: exerciseType) => {
        const exerciseDetails = await getExerciseDetailsByID(
          exercise["exerciseid"]
        );
        return { ...exercise, ...exerciseDetails };
      })
    );
    res.send(workout);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
export const createNewWorkout = async (req: Request, res: Response) => {
  try {
    const { programname, exercises } = req.body;
    const workoutid = await getNewWorkoutID();
    let firstID = await getNewPExericseID();

    const result = await query(
      "INSERT INTO workouts (workoutid, workoutname) VALUES ($1, $2) RETURNING *",
      [workoutid, programname]
    );
    exercises.map(async (e: exerciseType) => {
      firstID++;
      const exerciseid = e.exerciseid;
      const sets = 3;
      const reps = "6-8";
      try {
        await query(
          "INSERT INTO programexercises (programexerciseid, workoutid, exerciseid, sets, reps) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
          [firstID, workoutid, exerciseid, sets, reps]
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    });

    const newWorkout = result.rows[0];
    res.status(201).send(newWorkout);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM workouts ORDER BY workoutid ASC");
    res.send(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

const getNewWorkoutID = async () => {
  try {
    const result = await query("SELECT COUNT(*) FROM workouts");
    const newID = Number(result.rows[0].count) + 1;
    return newID;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWorkoutDetails = async (workoutId: number) => {
  try {
    const result = await query(
      "SELECT * FROM programexercises where workoutid = $1",
      [workoutId]
    );
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getWorkoutNameByID = async (workoutId: number) => {
  try {
    const result = await query("select * from workouts where workoutid = $1", [
      workoutId,
    ]);

    return result.rows[0].workoutname;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
