import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Link, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Button,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import Constants from "expo-constants";

const MyWorkoutRoutinesModal: React.FC = () => {
  let apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [exercises, setExercises] = useState<any>(null);
  const [exercisesByMG, setExercisesByMG] = useState<any>(null);
  const [exerciseTypes, setExerciseTypes] = useState<any>(null);

  const [workoutCart, setWorkoutCart] = useState<any>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(`${apiUrl}/exercises/all`);
      setExercises(response.data);
    };
    const fetchExerciseTypes = async () => {
      const response = await axios.get(`${apiUrl}/exercises/alltypes`);
      setExerciseTypes(response.data);
    };
    fetchExercises();
    fetchExerciseTypes();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Workout Routine",
      headerStyle: {
        backgroundColor: "#3d5a80",
      },
      headerTintColor: "#ffffff",
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const filterExercises = (muscletype: string) => {
    return exercises?.filter((e: any) => {
      if (e.muscletype == muscletype) {
        return true;
      }
      if (e.othermusclesworked?.find((tmp: string) => tmp == muscletype)) {
        return true;
      }
    });
  };
  const addtoCart = (eID: number) => {
    setWorkoutCart([
      ...workoutCart,
      exercises.find((e: any) => e.exerciseid === eID),
    ]);
  };
  const createWorkout = async () => {
    let data = { programname: "Test", exercises: workoutCart };
    try {
      let wResponse = await axios.post(`${apiUrl}/workouts/newWorkout`, data);
      workoutCart.map((e: any) => {});
    } catch (error) {
      console.error("Error creating new workout: ", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      <SelectDropdown
        defaultButtonText="Select a Muscle Group"
        data={exerciseTypes}
        buttonStyle={{
          width: "100%",
          height: 50,
          backgroundColor: "#FFF",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#444",
        }}
        onSelect={(selectedItem) => {
          setExercisesByMG(filterExercises(selectedItem));
        }}
        dropdownIconPosition="right"
        renderDropdownIcon={(isOpened) => {
          return (
            <Entypo
              name={isOpened ? "chevron-down" : "chevron-up"}
              size={24}
              color="black"
            />
          );
        }}
      />
      {exercisesByMG?.map((e: any) => {
        return (
          <Pressable
            onPress={() => {
              addtoCart(e.exerciseid);
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text>{e.exercisename}</Text>
              <Text>{e.muscletype}</Text>
              {e.othermusclesworked.map((i: any) => {
                return <Text>{i}</Text>;
              })}
            </View>
          </Pressable>
        );
      })}
      <Text>-----------------------</Text>
      <View>
        {workoutCart?.map((e: any) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{e.exercisename}</Text>
              <Text>3</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>6</Text>
                <Text> to </Text>
                <Text>8</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Link href="/myWorkoutRoutinesModal" asChild>
        <Button
          onPress={() => {
            createWorkout();
          }}
          title="Create Workout"
        />
      </Link>
    </View>
  );
};

export default MyWorkoutRoutinesModal;
