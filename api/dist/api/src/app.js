"use strict";
// import { Express } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const bodyParser = require("body-parser");
// const app = express();
// const workoutRoutes = require("./routes/workoutRoutes");
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;
// app.use("/api/workouts", workoutRoutes);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use("/api/workouts", workoutRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
