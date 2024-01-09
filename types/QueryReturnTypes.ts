export type exerciseType = {
  exerciseid: number;
  exercisename: string;
  muscletype: string;
  othermusclesworked: string;
};
export type programexercisesType = {
  programexerciseid: number;
  workoutid: number;
  exerciseid: number;
  sets: number;
  reps: string;
};
export type programType = {
  programid: number;
  programname: string;
  daysperweek: number;
  split: string;
  rating: number;
};
export type workoutType = {
  workoutid: number;
  workoutname: string;
  exercises?: exerciseType[];
};
export type workoutprogramType = {
  workoutid: number;
  programid: number;
};
