// import { Express } from "express";

// const bodyParser = require("body-parser");
// const app = express();
// const workoutRoutes = require("./routes/workoutRoutes");

// app.use(bodyParser.json());

// const PORT = process.env.PORT || 3000;

// app.use("/api/workouts", workoutRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import bodyParser from "body-parser";
import workoutRoutes from "./routes/workoutRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
