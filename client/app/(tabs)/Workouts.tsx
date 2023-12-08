import React from "react";
import { Text, View } from "react-native";
import WPstyles from "../../styles/WorkoutPageStyling";

const Workouts = () => {
  return (
    <View style={WPstyles.backgroundContainer}>
      <Text>My Workout Routines</Text>

      <Text>My Past Workouts</Text>
    </View>
  );
};

export default Workouts;
