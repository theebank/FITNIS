import express from "express";
import bodyParser from "body-parser";
import programController from "./routes/programRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import workoutRoutes from "./routes/workoutRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/programs", programController);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
