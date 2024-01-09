import express from "express";
import * as workoutController from "../controllers/workoutController";

const router = express.Router();

// Base end point is /api/workouts
router.get("/all", workoutController.getAllWorkouts);
router.get("/id/:workoutId", workoutController.getWorkoutByID);

router.post("/newWorkout", workoutController.createNewWorkout);

module.exports = router;

export default router;
