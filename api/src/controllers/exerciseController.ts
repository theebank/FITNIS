// import { TestData } from "../../../client/constants/TestWorkouts";

// export const getWorkoutByID = (req: any, res: any) => {
//   const workoutPlan = TestData.find(
//     (e) => e.id.toString() === req.params.workoutId
//   );
//   res.send(workoutPlan);
// };

// export const getWorkoutsByUID = (req: any, res: any) => {
//   let test = [1, 4, 6, 8];
//   const workouts = TestData.filter((e) => {
//     if (test.find((id) => id === e.id)) {
//       return true;
//     }
//   });
//   res.send(workouts);
// };
const db = require("../db");

export const getExerciseByID = async (req: any, res: any) => {
  try {
    const result = await db.query("SELECT * FROM exercises where id = $1", [
      req.params.exerciseId,
    ]);
    const exercise = result.rows[0];
    res.send(exercise);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};
