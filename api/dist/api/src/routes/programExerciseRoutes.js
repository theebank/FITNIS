"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const programExerciseController = require("../controllers/programExerciseController");
//Base end point is /api/programexercises
router.get("/newid", programExerciseController.getNewPExericseID);
module.exports = router;
exports.default = router;
