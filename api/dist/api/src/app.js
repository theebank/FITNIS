"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const programRoutes_1 = __importDefault(require("./routes/programRoutes"));
const exerciseRoutes_1 = __importDefault(require("./routes/exerciseRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const programExerciseRoutes_1 = __importDefault(require("./routes/programExerciseRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use("/api/programs", programRoutes_1.default);
app.use("/api/exercises", exerciseRoutes_1.default);
app.use("/api/workouts", workoutRoutes_1.default);
app.use("/api/programexercises", programExerciseRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
