import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import Constants from "expo-constants";
import {
  workoutType,
  combinedExerciseProgramType,
} from "../../../../types/DatabaseTypes";

const RoutineRender = ({ item }: { item: workoutType }) => {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [workoutdetails, setWorkoutdetails] = useState<workoutType>();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const fetchWDetails = async () => {
      const response = await axios.get(
        `${apiUrl}/workouts/id/` + item.workoutid
      );
      setWorkoutdetails(response.data);
    };
    fetchWDetails();
  }, []);

  const ClickedRender = () => {
    return (
      <Card.Content style={{ backgroundColor: "#e0fbfc" }}>
        <View>
          {workoutdetails?.exercises?.map((e: combinedExerciseProgramType) => {
            return (
              <View>
                <Text>{e.exercisename}</Text>
                <Text>
                  {e.sets}x{e.reps}
                </Text>
              </View>
            );
          })}
        </View>
      </Card.Content>
    );
  };
  const RoutineTitle = () => {
    return (
      <>
        {(workoutdetails?.exercises?.length ?? 0) > 0 ? (
          <Card.Title
            title={item.workoutname}
            right={() =>
              clicked ? (
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  onPress={() => {
                    setClicked(!clicked);
                  }}
                />
              ) : (
                <Entypo
                  name="chevron-up"
                  size={24}
                  color="black"
                  onPress={() => {
                    setClicked(!clicked);
                  }}
                />
              )
            }
          />
        ) : (
          <Card.Title title={item.workoutname} />
        )}
      </>
    );
  };

  return (
    <Card
      style={{
        backgroundColor: "#ee6c4d",
        margin: 5,
      }}
    >
      <RoutineTitle />
      {clicked && <ClickedRender />}
    </Card>
  );
};

export default RoutineRender;
