import { createSlice } from "@reduxjs/toolkit";
import { exerciseType } from "../../../types/DatabaseTypes";

export const ExerciseSlice = createSlice({
  name: "Exercises",
  initialState: {
    Exercises: [] as exerciseType[],
    exerciseTypes: [] as string[],
  },
  reducers: {
    redefineExercises: (state, action) => {
      state.Exercises = action.payload;
    },
    redefineTypes: (state, action) => {
      state.exerciseTypes = action.payload;
    },
  },
});

export const { redefineExercises, redefineTypes } = ExerciseSlice.actions;

export default ExerciseSlice.reducer;
