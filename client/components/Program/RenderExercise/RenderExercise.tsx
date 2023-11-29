import React from "react";
import { Pressable, Text, View } from "react-native";
import { exerciseType } from "../../../types/Exercise";
import { AntDesign } from "@expo/vector-icons";

const RenderExercise = ({
  Exercise,
  addToPlan,
  removeFromPlan,
  workoutplan,
}: {
  Exercise: exerciseType;
  addToPlan: any;
  removeFromPlan: any;
  workoutplan: any;
}) => {
  const AddIcon = () => {
    return (
      <Pressable onPress={() => addToPlan(Exercise)}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    );
  };
  const RemoveIcon = () => {
    return (
      <Pressable onPress={() => removeFromPlan(Exercise)}>
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
    );
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
        marginTop: 7,
      }}
    >
      {workoutplan.some((e: { name: string }) => e.name === Exercise.name) ? (
        <RemoveIcon />
      ) : (
        <AddIcon />
      )}
      <Text>{Exercise.name}</Text>
    </View>
  );
};

export default RenderExercise;
