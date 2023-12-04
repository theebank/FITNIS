"use strict";
// import { TestData } from "../../../client/constants/TestWorkouts";
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
exports.getExerciseByID = void 0;
// export const getWorkoutByID = (req: any, res: any) => {
//   const workoutPlan = TestData.find(
//     (e) => e.id.toString() === req.params.workoutId
//   );
//   res.send(workoutPlan);
// };
// export const getWorkoutsByUID = (req: any, res: any) => {
//   let test = [1, 4, 6, 8];
//   const workouts = TestData.filter((e) => {
//     if (test.find((id) => id === e.id)) {
//       return true;
//     }
//   });
//   res.send(workouts);
// };
const db = require("../db");
const getExerciseByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.query("SELECT * FROM exercises where id = $1", [
            req.params.exerciseId,
        ]);
        const exercise = result.rows[0];
        res.send(exercise);
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal server error");
    }
});
exports.getExerciseByID = getExerciseByID;
