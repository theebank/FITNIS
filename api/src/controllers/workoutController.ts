import { Request, Response } from "express";
import { getExerciseDetailsByID } from "./exerciseController";

const db = require("../db");

export const getWorkoutByID = async (req: Request, res: Response) => {
  try {
    let result = await db.query("SELECT * FROM workouts where workoutid = $1", [
      req.params.workoutId,
    ]);
    let workout = result.rows[0];
    workout["exercises"] = await getWorkoutDetails(
      Number(req.params.workoutId)
    );
    workout["exercises"] = await Promise.all(
      workout["exercises"].map(async (exercise: any) => {
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
    const { day } = req.body;
    let workoutid = await getNewWorkoutID();
    let result = await db.query(
      "INSERT INTO workouts (workoutid, day) VALUES ($1, $2) RETURNING *",
      [workoutid, day]
    );
    const newWorkout = result.rows[0];
    res.status(201).send(newWorkout);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    let result = await db.query("SELECT * FROM workouts");
    let workouts = result.rows;
    res.send(workouts);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

const getNewWorkoutID = async () => {
  try {
    let result = await db.query("SELECT * FROM workouts");
    let newID = result.rows.length + 1;
    return newID;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWorkoutDetails = async (workoutId: number) => {
  try {
    let result = await db.query(
      "SELECT * FROM programexercises where workoutid = $1",
      [workoutId]
    );
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
