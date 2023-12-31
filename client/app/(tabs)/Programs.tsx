import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import Program from "../../components/Program/Program";
import WPPstyles from "../../styles/WorkoutPlanPageStyling";
import { FAB } from "react-native-paper";
import { Link } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";

const Plans = () => {
  let apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [programs, setPrograms] = useState<any>(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const response = await axios.get(`${apiUrl}/programs/all`);
      setPrograms(response.data);
    };
    fetchWorkoutPlans();
  }, []);

  function addPlan(PName: string, Days: number, Split: string, Rate: number) {
    let i = {
      id: programs[programs.length - 1].id + 1,
      ProgramName: PName,
      DaysPerWeek: Days,
      Split: Split,
      Rating: Rate,
    };
    setPrograms((programs: any) => [...programs, i]);
  }
  function removePlan(
    PName: string,
    Days: number,
    Split: string,
    Rate: number
  ) {
    let temp = [...programs];
    let x = programs.findIndex(
      (element: {
        programname: string;
        daysperweek: number;
        split: string;
        rating: number;
      }) =>
        element.programname === PName &&
        element.daysperweek === Days &&
        element.split === Split &&
        element.rating === Rate
    );
    temp.splice(x, 1);
    setPrograms(temp);
  }

  return (
    <View style={WPPstyles.backgroundContainer}>
      {programs ? (
        <>
          <FlatList
            data={programs}
            keyExtractor={(item) => item.programid.toString()}
            renderItem={({ item, index }) => (
              <Program
                ProgramDetails={item}
                removePlan={removePlan}
                index={index}
                key={"FlatList" + item.programid.toString()}
              />
            )}
            showsVerticalScrollIndicator={false}
          ></FlatList>
          <Link href="/addProgramModal" asChild>
            <Pressable>
              <FAB
                style={{
                  position: "absolute",
                  margin: 16,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#87CEFA",
                  borderRadius: 50,
                }}
                icon="plus"
              />
            </Pressable>
          </Link>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Plans;
