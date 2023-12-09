import React from "react";
import { Text, View } from "react-native";
import WPstyles from "../../styles/WorkoutPageStyling";
import { Link } from "expo-router";

const Workouts = () => {
  return (
    <View style={WPstyles.backgroundContainer}>
      <Link href="/myWorkoutRoutinesModal" asChild>
        <Text>My Workout Routines</Text>
      </Link>

      <Text>My Past Workouts</Text>
    </View>
  );
};

export default Workouts;
