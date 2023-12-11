"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWorkouts = exports.createNewWorkout = exports.getWorkoutByID = void 0;
const exerciseController_1 = require("./exerciseController");
const db = require("../db");
const getWorkoutByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM workouts where workoutid = $1", [
            req.params.workoutId,
        ]);
        let workout = result.rows[0];
        workout["exercises"] = yield getWorkoutDetails(Number(req.params.workoutId));
        workout["exercises"] = yield Promise.all(workout["exercises"].map((exercise) => __awaiter(void 0, void 0, void 0, function* () {
            const exerciseDetails = yield (0, exerciseController_1.getExerciseDetailsByID)(exercise["exerciseid"]);
            return Object.assign(Object.assign({}, exercise), exerciseDetails);
        })));
        res.send(workout);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getWorkoutByID = getWorkoutByID;
const createNewWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day } = req.body;
        let workoutid = yield getNewWorkoutID();
        let result = yield db.query("INSERT INTO workouts (workoutid, day) VALUES ($1, $2) RETURNING *", [workoutid, day]);
        const newWorkout = result.rows[0];
        res.status(201).send(newWorkout);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.createNewWorkout = createNewWorkout;
const getAllWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM workouts ORDER BY workoutid ASC");
        let workouts = result.rows;
        res.send(workouts);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getAllWorkouts = getAllWorkouts;
const getNewWorkoutID = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM workouts");
        let newID = result.rows.length + 1;
        return newID;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getWorkoutDetails = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM programexercises where workoutid = $1", [workoutId]);
        return result.rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
