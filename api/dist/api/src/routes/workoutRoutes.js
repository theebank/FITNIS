"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const workoutController = require("../controllers/workoutController");
// Base end point is /api/workouts
router.get("/all", workoutController.getAllWorkouts);
router.get("/id/:workoutId", workoutController.getWorkoutByID);
router.post("/newWorkout", workoutController.createNewWorkout);
module.exports = router;
exports.default = router;
