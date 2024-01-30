import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import {
  combinedExerciseProgramType,
  programexercisesType,
  workoutType,
  exerciseType,
} from "../../../../../types/DatabaseTypes";

interface ProgramWorkoutDayProps {
  Workout: workoutType;
  index: number;
}

const WorkoutDetailsRendering = ({
  Workout,
  index,
}: ProgramWorkoutDayProps) => {
  const renderCEPType = (exercise: combinedExerciseProgramType) => {
    return (
      <DataTable.Row key={"" + index + "cep" + exercise.exercisename}>
        <DataTable.Cell style={{ flex: 3, flexWrap: "wrap" }}>
          <Text ellipsizeMode="tail">{exercise.exercisename}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>{exercise.sets}</DataTable.Cell>
        <DataTable.Cell numeric>{exercise.reps}</DataTable.Cell>
      </DataTable.Row>
    );
  };
  const renderEType = (exercise: exerciseType) => {
    return (
      <DataTable.Row key={"" + index + "e" + exercise.exercisename}>
        <DataTable.Cell style={{ flex: 3, flexWrap: "wrap" }}>
          <Text ellipsizeMode="tail">{exercise.exercisename}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>N/A</DataTable.Cell>
        <DataTable.Cell numeric>N/A</DataTable.Cell>
      </DataTable.Row>
    );
  };
  const renderPEType = (exercise: programexercisesType) => {
    return (
      <DataTable.Row key={"" + index + +"pe" + exercise.programexerciseid}>
        <DataTable.Cell style={{ flex: 3, flexWrap: "wrap" }}>
          <Text ellipsizeMode="tail">Incomplete Data Type</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>{exercise.sets}</DataTable.Cell>
        <DataTable.Cell numeric>{exercise.reps}</DataTable.Cell>
      </DataTable.Row>
    );
  };
  if (Array.isArray(Workout.exercises)) {
    const firstE = Workout.exercises?.[0];
    if (!firstE) {
      return <></>;
    }
    if ("exerciseid" in firstE && "programexerciseid" in firstE) {
      return Workout.exercises.map((e) =>
        renderCEPType(e as combinedExerciseProgramType)
      );
    } else if ("exerciseid" in firstE) {
      return Workout.exercises.map((e) => renderEType(e as exerciseType));
    } else if ("programexerciseid" in firstE) {
      return Workout.exercises.map((e) =>
        renderPEType(e as programexercisesType)
      );
    }
  }
};

export default WorkoutDetailsRendering;
