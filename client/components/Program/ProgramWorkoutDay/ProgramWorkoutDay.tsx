import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Card, DataTable } from "react-native-paper";
import PWDstyles from "./ProgramWorkoutDayStyling";

interface ProgramWorkoutDayProps {
  Workout: any;
  index: number;
}

const ProgramWorkoutDay = ({
  Workout,
  index,
}: {
  Workout: any;
  index: any;
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

  const WorkoutDetailsRendering = ({
    Workout,
    index,
  }: ProgramWorkoutDayProps) => {
    return Workout.exercises.map((e: any) => (
      <DataTable.Row key={"" + index + e.exercisename}>
        <DataTable.Cell style={{ flex: 3, flexWrap: "wrap" }}>
          <Text ellipsizeMode="tail">{e.exercisename}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>{e.sets}</DataTable.Cell>
        <DataTable.Cell numeric>{e.reps}</DataTable.Cell>
      </DataTable.Row>
    ));
  };

  const [clicked, setClicked] = useState(false);
  if (Workout.exercises.length > 0) {
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
