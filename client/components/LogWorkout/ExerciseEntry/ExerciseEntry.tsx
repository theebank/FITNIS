import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementSets,
  incrementSets,
  removeFromCart,
} from "../../../features/LogWorkout/LogWorkoutSlice";
import { RootState } from "../../../store/store";

export default function ExerciseEntry({
  //   exercise,
  // }: {
  //   exercise: exerciseType;
  // }) {
  exercisename,
  idx,
}: {
  exercisename: string;
  idx: number;
}) {
  const sets = useSelector(
    (state: RootState) => state.logWorkout.setsPerExercise
  );
  const dispatch = useDispatch();

  function SetDetails() {
    const ret: React.JSX.Element[] = [];
    for (let i = 0; i < sets[idx]; i++) {
      ret.push(
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Set {i + 1}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Weight </Text>
            <TextInput placeholder="0" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Reps </Text>
            <TextInput placeholder="0" />
          </View>
        </View>
      );
    }
    if (ret.length > 0) {
      ret.push(
        <Button
          title="Remove Set"
          onPress={() => dispatch(decrementSets(idx))}
        />
      );
    }
    return ret;
  }
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={exercisename}
        right={() => (
          <Button
            title="Remove"
            onPress={() => dispatch(removeFromCart(idx))}
          />
        )}
      />
      <Card.Content>
        {/* <Text>{exercisename}</Text> */}
        <SetDetails />

        <Button title="Add Set" onPress={() => dispatch(incrementSets(idx))} />
      </Card.Content>
    </Card>
  );
}
