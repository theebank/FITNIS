import express from "express";
const router = express.Router();
import * as programExerciseController from "../controllers/programExerciseController";

//Base end point is /api/programexercises
router.get("/newid", programExerciseController.getNewPExericseID);

module.exports = router;

export default router;
