export type exerciseType = {
  exerciseid: number;
  exercisename: string;
  muscletype: string;
  othermusclesworked: string[];
};
export type programexercisesType = {
  programexerciseid: number;
  workoutid: number;
  exerciseid: number;
  sets: number;
  reps: string;
};
export type combinedExerciseProgramType = exerciseType & programexercisesType;
export type programType = {
  programid: number;
  programname: string;
  daysperweek: number;
  split: string;
  rating: number;
  workouts?: workoutType[];
};
export type workoutType = {
  workoutid: number;
  workoutname: string;
  programid?: number;
  exercises?:
    | exerciseType[]
    | programexercisesType[]
    | combinedExerciseProgramType[];
};
export type workoutprogramType = {
  workoutid: number;
  programid: number;
};
