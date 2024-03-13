import { useState } from "react";
import { exerciseType } from "../../../../../types/DatabaseTypes";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import SPEStyles from "./SetsPerExerciseStyles";
import { Entypo } from "@expo/vector-icons";

const SetsPerExercise = ({ exercise }: { exercise: any }) => {
  // TODO create text input for each value and when you click back or next it accumulates the cahnges
  const SetDetails = ({ setnum }: { setnum: number }) => {
    const [active, setActive] = useState(false);
    const [repText, setRepText] = useState(exercise.sets[setnum - 1].reps);
    const [rpeText, setrpeText] = useState(exercise.sets[setnum - 1].rpe);
    const [noteText, setNoteText] = useState(exercise.sets[setnum - 1].notes);
    const handlerepTextChange = (newText: string) => {
      setRepText(newText);
    };
    const handlerpeTextChange = (newText: string) => {
      setrpeText(newText);
    };
    const handlenotesTextChange = (newText: string) => {
      setNoteText(newText);
    };
    return (
      <>
        <TouchableOpacity
          onPress={() => setActive(!active)}
          style={{ flexDirection: "row" }}
        >
          <Text>Set {setnum}</Text>
          {active ? (
            <Entypo name="chevron-down" size={24} color="black" />
          ) : (
            <Entypo name="chevron-up" size={24} color="black" />
          )}
        </TouchableOpacity>
        {active && (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text>Reps: </Text>
              <TextInput
                placeholder={exercise.sets[setnum - 1].reps}
                value={repText}
                onChangeText={handlerepTextChange}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>RPE: {exercise.sets[setnum - 1].rpe}</Text>
              <TextInput
                placeholder={exercise.sets[setnum - 1].rpe}
                value={rpeText}
                onChangeText={handlerpeTextChange}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Notes: {exercise.sets[setnum - 1].notes}</Text>
              <TextInput
                placeholder={exercise.sets[setnum - 1].rpe}
                value={noteText}
                onChangeText={handlenotesTextChange}
              />
            </View>
          </View>
        )}
      </>
    );
  };
  const increment = () => {
    // accumulateChanges(idx, sets[idx] + 1);
    // setNumSets(sets[idx]);
  };
  const decrement = () => {
    // if (sets[idx] > 1) {
    //   accumulateChanges(idx, sets[idx] - 1);
    //   setNumSets(sets[idx]);
    // }
  };
  const RenderSet = () => {
    const ret: React.JSX.Element[] = [];
    for (let i = 1; i <= exercise.sets.length; i++) {
      ret.push(<SetDetails setnum={i} />);
    }
    ret.push(
      <>
        <TouchableOpacity onPress={increment}>
          <Text>+ Add set</Text>
        </TouchableOpacity>
      </>
    );
    ret.push(
      <>
        <TouchableOpacity onPress={decrement}>
          <Text>- Remove set</Text>
        </TouchableOpacity>
      </>
    );
    return ret;
  };
  return (
    <Card>
      <Card.Title title={exercise.exercisename} />
      <Card.Content>
        <RenderSet />
      </Card.Content>
    </Card>
  );
};

export default SetsPerExercise;
