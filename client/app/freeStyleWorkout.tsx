import { Link, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import Timer from "../components/LogWorkout/Timer/Timer";

const freeStyleWorkout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Free Style Your Workout!",
      headerStyle: { backgroundColor: "#3d5a80" },
      headerTintColor: "#ffffff",
    });
  });
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Timer />
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text>Volume: </Text>
          <Text>Volume Value</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text>Sets: </Text>
          <Text>Sets Value</Text>
        </View>
      </View>
      <Link asChild href="/LogworkoutModals/AddExerciseModal">
        <Button title="Add Exercise" />
      </Link>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="Settings" />
        <Button title="Cancel Workout" />
      </View>
    </View>
  );
};

export default freeStyleWorkout;
