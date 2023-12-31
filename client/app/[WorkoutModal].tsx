import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import ProgramWorkoutDay from "../components/Program/ProgramWorkoutDay/ProgramWorkoutDay";
import WMstyles from "../styles/WorkoutModalStyling";
import axios from "axios";
import Constants from "expo-constants";

const index = () => {
  let apiUrl = Constants.expoConfig?.extra?.API_URL;
  const navigation = useNavigation();
  const { ProgramName, DaysPerWeek, Split, ProgramID } = useLocalSearchParams();
  const [programDetails, setProgramDetails] = useState<any>(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      const response = await axios.get(
        `${apiUrl}/programs/id/` + Number(ProgramID)
      );
      setProgramDetails(response.data);
    };

    fetchProgramDetails();
  }, []);

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
        {programDetails?.workouts &&
          programDetails.workouts.map((i: any, key: string) => (
            <ProgramWorkoutDay Workout={i} index={key} key={"PWD" + key} />
          ))}
      </ScrollView>
    </View>
  );
};

export default index;
