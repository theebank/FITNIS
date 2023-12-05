import { TestData } from "../../../client/constants/TestWorkouts";
import { getExerciseByID } from "./exerciseController";

const db = require("../db");

export const getProgramByID = async (req: any, res: any) => {
  try {
    let result = await db.query("SELECT * FROM programs where programid = $1", [
      req.params.programId,
    ]);
    let program = result.rows[0];
    program["workouts"] = await getWorkouts(req.params.programId);
    program["workouts"] = await Promise.all(
      program["workouts"].map(async (workout: any) => {
        workout["exercises"] = await getExercisesByDay(workout["workoutid"]);
        return workout;
      })
    );
    res.send(program);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

export const getWorkoutsByUID = (req: any, res: any) => {
  let test = [1, 4, 6, 8];
  const workouts = TestData.filter((e) => {
    if (test.find((id) => id === e.id)) {
      return true;
    }
  });
  res.send(workouts);
};

const getWorkouts = async (programID: number) => {
  try {
    let result = await db.query("SELECT * FROM Workouts where programid = $1", [
      programID,
    ]);
    return result.rows;
  } catch (error) {
    console.log(error);
    return [];
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
    return [];
  }
};
