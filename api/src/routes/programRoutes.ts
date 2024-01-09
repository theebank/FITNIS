import express from "express";
const router = express.Router();

import * as programController from "../controllers/programController";

// Base end point is /api/programs
router.get("/id/:programId", programController.getProgramByID);
router.get("/user/:userId/plans", programController.getWorkoutsByUID);
router.get("/all", programController.getAllPrograms);
// router.get("/newid", programController.getNewProgramID);
router.post("/newProgram", programController.createNewProgram);

module.exports = router;

export default router;
