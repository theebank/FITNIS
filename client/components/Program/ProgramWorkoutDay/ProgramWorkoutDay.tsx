import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Card, DataTable } from "react-native-paper";
import PWDstyles from "./ProgramWorkoutDayStyling";
import { workoutType } from "../../../../types/DatabaseTypes";
import WorkoutDetailsRendering from "./WorkoutDetailsRendering/WorkoutDetailsRendering";

const ProgramWorkoutDay = ({
  Workout,
  index,
}: {
  Workout: workoutType;
  index: number;
}) => {
  const DataTableHeaders = () => {
    return (
      <DataTable.Header key={"" + index}>
        <DataTable.Title style={{ display: "flex", width: 100 }}>
          Exercise
        </DataTable.Title>
        <DataTable.Title numeric>Reps</DataTable.Title>
        <DataTable.Title numeric>Sets</DataTable.Title>
      </DataTable.Header>
    );
  };

  const [clicked, setClicked] = useState(false);
  if (Workout.exercises && Workout.exercises.length > 0) {
    return (
      <View key={index} style={PWDstyles.outercontainerView}>
        <Card>
          <Card.Content>
            <Pressable onPress={() => setClicked(!clicked)}>
              <View style={PWDstyles.innerContainerView}>
                <Text>{Workout.workoutname}</Text>
                {clicked ? (
                  <Entypo name="chevron-down" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-up" size={24} color="black" />
                )}
              </View>
            </Pressable>
            {clicked && (
              <DataTable>
                {DataTableHeaders()}
                <WorkoutDetailsRendering Workout={Workout} index={index} />
              </DataTable>
            )}
          </Card.Content>
        </Card>
      </View>
    );
  } else {
    return (
      <View key={index} style={PWDstyles.outercontainerView}>
        <Card>
          <Card.Content>
            <Text>{Workout.workoutname}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }
};

export default ProgramWorkoutDay;
