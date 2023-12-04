"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutsByUID = exports.getWorkoutByID = void 0;
const TestWorkouts_1 = require("../../../client/constants/TestWorkouts");
const getWorkoutByID = (req, res) => {
    const workoutPlan = TestWorkouts_1.TestData.find((e) => e.id.toString() === req.params.workoutId);
    res.send(workoutPlan);
};
exports.getWorkoutByID = getWorkoutByID;
const getWorkoutsByUID = (req, res) => {
    let test = [1, 4, 6, 8];
    const workouts = TestWorkouts_1.TestData.filter((e) => {
        if (test.find((id) => id === e.id)) {
            return true;
        }
    });
    res.send(workouts);
};
exports.getWorkoutsByUID = getWorkoutsByUID;
