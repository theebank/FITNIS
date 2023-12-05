import express from "express";
const router = express.Router();

const programController = require("../controllers/programController");

// Base end point is /api/programs
router.get("/:programId", programController.getProgramByID);
router.get("/user/:userId/plans", programController.getWorkoutsByUID);

module.exports = router;

export default router;
