import { Link, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import Timer from "../components/LogWorkout/Timer/Timer";

import { useSelector } from "react-redux";
import ExerciseEntry from "../components/LogWorkout/ExerciseEntry/ExerciseEntry";
import { RootState } from "../store/store";
import { exerciseType } from "../../types/DatabaseTypes";

const freeStyleWorkout = () => {
  const cart = useSelector((state: RootState) => state.logWorkout.ExerciseCart);

  const navigation = useNavigation();

  console.log(cart);
  useEffect(() => {
    navigation.setOptions({
      title: "Free Style Your Workout!",
      headerStyle: { backgroundColor: "#3d5a80" },
      headerTintColor: "#ffffff",
    });
  });
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomWidth: 2,
          borderColor: "#000000",
        }}
      >
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
      <ScrollView>
        {cart.map((e: exerciseType, idx: number) => {
          return <ExerciseEntry exercisename={e.exercisename} idx={idx} />;
        })}
        <Link asChild href="/LogworkoutModals/AddExerciseModal">
          <Button title="Add Exercise" />
        </Link>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 55,
          }}
        >
          <Button title="Settings" />
          <Button title="Cancel Workout" />
        </View>
      </ScrollView>
    </View>
  );
};

export default freeStyleWorkout;
