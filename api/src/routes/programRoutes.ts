import express from "express";
const router = express.Router();

const programController = require("../controllers/programController");

// Base end point is /api/programs
router.get("/id/:programId", programController.getProgramByID);
router.get("/user/:userId/plans", programController.getWorkoutsByUID);
router.get("/all", programController.getAllPrograms);

module.exports = router;

export default router;
