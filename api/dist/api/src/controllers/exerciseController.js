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
exports.getAllExercises = exports.getExerciseDetailsByID = exports.getExerciseByID = void 0;
const db = require("../db");
const getExerciseByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield (0, exports.getExerciseDetailsByID)(Number(req.params.exerciseId));
        res.send(exercise);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getExerciseByID = getExerciseByID;
const getExerciseDetailsByID = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.query("SELECT * FROM exercises where exerciseid = $1", [workoutId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
});
exports.getExerciseDetailsByID = getExerciseDetailsByID;
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.query("SELECT * FROM exercises");
        res.send(result.rows);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getAllExercises = getAllExercises;
