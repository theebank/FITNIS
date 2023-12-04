import express from "express";
const router = express.Router();

const programController = require("../controllers/programController");

// Base end point is /api/workouts
router.get("/:workoutId", programController.getWorkoutByID);
router.get("/user/:userId/plans", programController.getWorkoutsByUID);

module.exports = router;

export default router;
