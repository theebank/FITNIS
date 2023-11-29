import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { TestData } from "../constants/TestWorkouts";
import ProgramWorkoutDay from "../components/Program/ProgramWorkoutDay/ProgramWorkoutDay";
import WMstyles from "../styles/WorkoutModalStyling";

const index = () => {
  const navigation = useNavigation();
  const { ProgramName, DaysPerWeek, Split, ProgramID } = useLocalSearchParams();

  const ProgramDetails = TestData.find(
    (element) => Number(ProgramID) == element.id
  );

  useEffect(() => {
    // Set the title dynamically
    navigation.setOptions({ title: ProgramName });
  }, [ProgramName]);
  return (
    <View style={WMstyles.backgroundContainer}>
      <Card style={WMstyles.cardContainer}>
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            {/* If you put this in the style file it gives a big error for some reason */}
            <Text>{ProgramName}</Text>
            <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
              {/* Same with this one ^ */}
              <Text>Days/Week: {DaysPerWeek}</Text>
              <Text>Split: {Split}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ProgramDetails?.Workouts &&
          ProgramDetails.Workouts.map((i, key) => (
            <ProgramWorkoutDay Workout={i} index={key} key={"PWD" + key} />
          ))}
      </ScrollView>
    </View>
  );
};

export default index;
