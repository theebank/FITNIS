const db = require("../db");

export const getExerciseByID = async (req: any, res: any) => {
  try {
    const exercise = await getExerciseDetailsByID(req.params.exerciseId);
    res.send(exercise);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal server error");
  }
};

export const getExerciseDetailsByID = async (workoutId: number) => {
  try {
    const result = await db.query(
      "SELECT * FROM exercises where exerciseid = $1",
      [workoutId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};
