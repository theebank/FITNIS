import { Button, Text, View } from "react-native";
import { exerciseType } from "../../../../types/DatabaseTypes";
import { useState } from "react";
import { Card } from "react-native-paper";

export default function ExerciseEntry({
  //   exercise,
  // }: {
  //   exercise: exerciseType;
  // }) {
  exercisename,
}: {
  exercisename: string;
}) {
  const [numSets, setNumSets] = useState<number>(0);

  function SetDetails() {
    let ret: React.JSX.Element[] = [];
    for (let i = 0; i < numSets; i++) {
      ret.push(
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Set SetValue</Text>
          <Text>Weight WeightInput</Text>
          <Text>Reps RepInput</Text>
        </View>
      );
    }
    if (ret.length > 0) {
      ret.push(
        <Button title="Remove Set" onPress={() => setNumSets(numSets - 1)} />
      );
    }
    return ret;
  }
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={exercisename} />
      <Card.Content>
        {/* <Text>{exercisename}</Text> */}
        <SetDetails />

        <Button title="Add Set" onPress={() => setNumSets(numSets + 1)} />
      </Card.Content>
    </Card>
  );
}
