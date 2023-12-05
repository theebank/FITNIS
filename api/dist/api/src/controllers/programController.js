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
exports.getWorkoutsByUID = exports.getProgramByID = void 0;
const TestWorkouts_1 = require("../../../client/constants/TestWorkouts");
const exerciseController_1 = require("./exerciseController");
const db = require("../db");
const getProgramByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM programs where programid = $1", [
            req.params.programId,
        ]);
        let program = result.rows[0];
        program["workouts"] = yield getWorkouts(req.params.programId);
        program["workouts"] = yield Promise.all(program["workouts"].map((workout) => __awaiter(void 0, void 0, void 0, function* () {
            const exercises = yield getExercisesByDay(workout["workoutid"]);
            workout["exercises"] = yield Promise.all(exercises.map((exercise) => __awaiter(void 0, void 0, void 0, function* () {
                const exerciseDetails = yield (0, exerciseController_1.getExerciseDetailsByID)(exercise["exerciseid"]);
                return Object.assign(Object.assign({}, exercise), exerciseDetails);
            })));
            return workout;
        })));
        res.send(program);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getProgramByID = getProgramByID;
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
const getWorkouts = (programID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM Workouts where programid = $1", [
            programID,
        ]);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getExercisesByDay = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield db.query("SELECT * FROM programexercises WHERE workoutid = $1", [workoutId]);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
