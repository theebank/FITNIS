import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import logWorkoutReducer from "../features/LogWorkout/LogWorkoutSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    logWorkout: logWorkoutReducer,
  },
});

// Infer rootstate type from store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
