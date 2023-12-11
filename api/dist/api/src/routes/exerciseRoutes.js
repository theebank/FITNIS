"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const exerciseController = require("../controllers/exerciseController");
// Base end point is /api/exercises
router.get("/id/:exerciseId", exerciseController.getExerciseByID);
router.get("/all", exerciseController.getAllExercises);
module.exports = router;
exports.default = router;
