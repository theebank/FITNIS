import { Request, Response } from "express";
import { TestData } from "../../../client/constants/TestWorkouts";
import { getExerciseDetailsByID } from "./exerciseController";
import { getWorkoutNameByID } from "./workoutController";

const db = require("../db");

export const getProgramByID = async (req: Request, res: Response) => {
  try {
    let result = await db.query("SELECT * FROM programs where programid = $1", [
      req.params.programId,
    ]);
    let program = result.rows[0];
    program["workouts"] = await getWorkouts(Number(req.params.programId));
    program["workouts"] = await Promise.all(
      program["workouts"].map(async (workout: any) => {
        workout["workoutname"] = await getWorkoutNameByID(
          Number(workout["workoutid"])
        );
        const exercises = await getExercisesByDay(workout["workoutid"]);
        workout["exercises"] = await Promise.all(
          exercises.map(async (exercise: any) => {
            const exerciseDetails = await getExerciseDetailsByID(
              exercise["exerciseid"]
            );
            return { ...exercise, ...exerciseDetails };
          })
        );
        return workout;
      })
    );
    res.send(program);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    let result = await db.query("SELECT * FROM programs");
    let programs = result.rows;
    res.send(programs);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
export const createNewProgram = async (req: Request, res: Response) => {
  // 1) First create workout program
  try {
    const { programname, daysperweek, split, rating } = req.body;
    let programid = await getNewProgramID();
    let result = await db.query(
      "INSERT INTO programs (programid, programname, daysperweek, split, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [programid, programname, daysperweek, split, rating]
    );
    const newProgram = result.rows[0];
    // 2) Map through workouts and create association between them

    res.status(201).send(newProgram);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }

  // 3) Should only be sending: Workout program details (name, daysperweek, etc) and [workoutprogramids]
};

export const getWorkoutsByUID = (req: Request, res: Response) => {
  let test = [1, 4, 6, 8];
  const workouts = TestData.filter((e) => {
    if (test.find((id) => id === e.id)) {
      return true;
    }
  });
  res.send(workouts);
};

const getNewProgramID = async () => {
  try {
    let result = await db.query("SELECT * FROM programs");
    let newID = result.rows.length + 1;
    return newID;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWorkouts = async (programID: number) => {
  try {
    let result = await db.query(
      "SELECT * FROM workoutprograms where programid = $1",
      [programID]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getExercisesByDay = async (workoutId: number) => {
  try {
    let result = await db.query(
      "SELECT * FROM programexercises WHERE workoutid = $1",
      [workoutId]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
