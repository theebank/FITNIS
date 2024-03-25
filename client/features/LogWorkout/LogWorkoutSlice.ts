import { createSlice } from "@reduxjs/toolkit";

export const LogWorkoutSlice = createSlice({
  name: "LogWorkout",
  initialState: { ExerciseCart: [] as string[] },
  reducers: {
    addToCart: (state, action) => {
      state.ExerciseCart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.ExerciseCart = state.ExerciseCart.filter(
        (e) => e != action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = LogWorkoutSlice.actions;

export default LogWorkoutSlice.reducer;
