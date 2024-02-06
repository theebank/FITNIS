import { ScrollView, View, Text, Button } from "react-native";
import { Card } from "react-native-paper";
import { workoutType } from "../../../../../types/DatabaseTypes";
import { Link } from "expo-router";

const RenderWorkoutPrograms = ({
  plansAssociated,
  setPlansAssociated,
  workoutPlans,
}: {
  plansAssociated: number[];
  setPlansAssociated: React.Dispatch<React.SetStateAction<number[]>>;
  workoutPlans: workoutType[] | null;
}) => {
  const CreateWorkoutButton = () => {
    return (
      <Link href="/createWorkoutModal" asChild>
        <Button title="Create Workout" />
      </Link>
    );
  };
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title title="Workout Routines" />
      <Card.Content>
        <ScrollView style={{ height: 270 }}>
          {workoutPlans?.map((e: workoutType, index: number) => {
            return (
              <View key={e.workoutid.toString()}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 8, // Add padding for spacing around the item
                  }}
                >
                  <Text style={{ flex: 1 }}>{e.workoutname}</Text>
                  <Button
                    onPress={() =>
                      setPlansAssociated([...plansAssociated, e.workoutid])
                    }
                    title="+"
                  />
                </View>
                {index < workoutPlans.length - 1 && ( // Don't add a line after the last item
                  <View
                    style={{
                      borderBottomColor: "#D3D3D3",
                      borderBottomWidth: 1,
                      marginVertical: 8, // Vertical spacing around the line
                    }}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
        <CreateWorkoutButton />
      </Card.Content>
    </Card>
  );
};

export default RenderWorkoutPrograms;
