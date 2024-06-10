import { createSlice } from "@reduxjs/toolkit";
import { exerciseType } from "../../../types/DatabaseTypes";

export const LogWorkoutSlice = createSlice({
  name: "LogWorkout",
  initialState: {
    ExerciseCart: [] as exerciseType[],
    setsPerExercise: [] as number[],
    reps: [] as number[][],
    weight: [] as number[][],
  },
  reducers: {
    addToCart: (state, action) => {
      state.ExerciseCart.push(action.payload);
      state.setsPerExercise.push(0);
      state.reps.push([]);
      state.weight.push([]);
    },
    removeFromCart: (state, action) => {
      state.ExerciseCart = [
        ...state.ExerciseCart.slice(0, action.payload),
        ...state.ExerciseCart.slice(action.payload + 1),
      ];
      state.setsPerExercise = [
        ...state.setsPerExercise.slice(0, action.payload),
        ...state.setsPerExercise.slice(action.payload + 1),
      ];
    },
    incrementSets: (state, action) => {
      state.setsPerExercise[action.payload] += 1;
      state.reps[action.payload].push(0);
      state.weight[action.payload].push(0);
    },
    decrementSets: (state, action) => {
      state.setsPerExercise[action.payload] -= 1;
      state.reps[action.payload] = state.reps[action.payload].slice(0, -1);
      state.weight[action.payload] = state.weight[action.payload].slice(0, -1);
    },
  },
});

export const { addToCart, removeFromCart, incrementSets, decrementSets } =
  LogWorkoutSlice.actions;

export default LogWorkoutSlice.reducer;
