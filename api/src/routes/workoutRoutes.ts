import express from "express";
const router = express.Router();
import bodyParser from "body-parser";

const workoutController = require("../controllers/workoutController");

router.get("/:workoutId", workoutController.getWorkoutByID);
router.get("/user/:userId/plans", workoutController.getWorkoutsByUID);
router.get("/all", workoutController.getAllWorkouts);

module.exports = router;

export default router;
