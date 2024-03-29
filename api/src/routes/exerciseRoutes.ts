import express from "express";
const router = express.Router();

import * as exerciseController from "../controllers/exerciseController";

// Base end point is /api/exercises
router.get("/id/:exerciseId", exerciseController.getExerciseByID);
router.get("/all", exerciseController.getAllExercises);
router.get("/alltypes", exerciseController.getAllExerciseTypes);
module.exports = router;

export default router;
