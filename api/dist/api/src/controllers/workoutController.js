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
exports.getWorkoutNameByID = exports.getAllWorkouts = exports.createNewWorkout = exports.getWorkoutByID = void 0;
const exerciseController_1 = require("./exerciseController");
const programExerciseController_1 = require("./programExerciseController");
const db_1 = require("../db");
const getWorkoutByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)("SELECT * FROM workouts where workoutid = $1", [
            req.params.workoutId,
        ]);
        const workout = result.rows[0];
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
        const { programname, exercises } = req.body;
        const workoutid = yield getNewWorkoutID();
        let firstID = yield (0, programExerciseController_1.getNewPExericseID)();
        const result = yield (0, db_1.query)("INSERT INTO workouts (workoutid, workoutname) VALUES ($1, $2) RETURNING *", [workoutid, programname]);
        exercises.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            firstID++;
            const exerciseid = e.exerciseid;
            const sets = 3;
            const reps = "6-8";
            // console.log(firstID, workoutid, exerciseid, sets, reps);
            try {
                const result = yield (0, db_1.query)("INSERT INTO programexercises (programexerciseid, workoutid, exerciseid, sets, reps) VALUES ($1, $2, $3, $4, $5) RETURNING * ", [firstID, workoutid, exerciseid, sets, reps]);
                console.log(result);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }));
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
        const result = yield (0, db_1.query)("SELECT * FROM workouts ORDER BY workoutid ASC");
        res.send(result.rows);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getAllWorkouts = getAllWorkouts;
const getNewWorkoutID = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)("SELECT COUNT(*) FROM workouts");
        const newID = Number(result.rows[0].count) + 1;
        return newID;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getWorkoutDetails = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)("SELECT * FROM programexercises where workoutid = $1", [workoutId]);
        return result.rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getWorkoutNameByID = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)("select * from workouts where workoutid = $1", [
            workoutId,
        ]);
        return result.rows[0].workoutname;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.getWorkoutNameByID = getWorkoutNameByID;
