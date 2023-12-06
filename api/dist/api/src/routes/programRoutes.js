"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const programController = require("../controllers/programController");
// Base end point is /api/programs
router.get("/id/:programId", programController.getProgramByID);
router.get("/user/:userId/plans", programController.getWorkoutsByUID);
router.get("/all", programController.getAllPrograms);
module.exports = router;
exports.default = router;
