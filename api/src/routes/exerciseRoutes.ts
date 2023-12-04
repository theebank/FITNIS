import express from "express";
const router = express.Router();

const exerciseController = require("../controllers/exerciseController");

// Base end point is /api/exercises
router.get("/:exerciseId", exerciseController.getExerciseByID);

module.exports = router;

export default router;
