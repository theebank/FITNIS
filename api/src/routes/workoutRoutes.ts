import express from "express";
const router = express.Router();

const workoutController = require("../controllers/workoutController");

// Base end point is /api/workouts
router.get("/all", workoutController.getAllWorkouts);
router.get("/id/:workoutId", workoutController.getWorkoutByID);

router.post("/newWorkout", workoutController.createNewWorkout);

module.exports = router;

export default router;
