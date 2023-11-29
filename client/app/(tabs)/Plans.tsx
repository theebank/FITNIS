import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import Program from "../../components/Program/Program";
import { TestData } from "../../constants/TestWorkouts";
import WPPstyles from "../../styles/WorkoutPlanPageStyling";
import { FAB } from "react-native-paper";
import { Link } from "expo-router";

const Plans = () => {
  const [Plans, setPlans] = useState(TestData);

  function addPlan(PName: string, Days: number, Split: string, Rate: number) {
    let i = {
      id: Plans[Plans.length - 1].id + 1,
      ProgramName: PName,
      DaysPerWeek: Days,
      Split: Split,
      Rating: Rate,
    };
    setPlans((oldPlans) => [...oldPlans, i]);
  }
  function removePlan(
    PName: string,
    Days: number,
    Split: string,
    Rate: number
  ) {
    let temp = [...Plans];
    let x = Plans.findIndex(
      (element) =>
        element.ProgramName === PName &&
        element.DaysPerWeek === Days &&
        element.Split === Split &&
        element.Rating === Rate
    );
    temp.splice(x, 1);
    setPlans(temp);
  }

  return (
    <View style={WPPstyles.backgroundContainer}>
      <FlatList
        data={Plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Program
            ProgramDetails={item}
            removePlan={removePlan}
            index={index}
            key={"FlatList" + item.id.toString()}
          />
        )}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      <Link href="/addWorkoutModal" asChild>
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
    </View>
  );
};

export default Plans;
