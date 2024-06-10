import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementSets,
  incrementSets,
  removeFromCart,
} from "../../../features/LogWorkout/LogWorkoutSlice";
import { RootState } from "../../../store/store";
import { Swipeable } from "react-native-gesture-handler";
import Pstyles from "../../Program/ProgramStyling";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

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
  const reps = useSelector((state: RootState) => state.logWorkout.reps);
  const weight = useSelector((state: RootState) => state.logWorkout.weight);
  const dispatch = useDispatch();
  console.log(sets, reps, weight);

  function SetDetails() {
    const ret: React.JSX.Element[] = [];
    const [text, setText] = useState<string>("");
    const handleTextChange = (newText: string) => {
      setText(newText);
    };
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
            <TextInput
              placeholder="0"
              onChangeText={handleTextChange}
              value={text}
            />
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
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => dispatch(removeFromCart(idx))}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "red",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="trash" size={24} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    >
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

          <Button
            title="Add Set"
            onPress={() => dispatch(incrementSets(idx))}
          />
        </Card.Content>
      </Card>
    </Swipeable>
  );
}
