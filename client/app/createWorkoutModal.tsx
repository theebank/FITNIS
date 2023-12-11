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

const MyWorkoutRoutinesModal: React.FC = () => {
  const [exercises, setExercises] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/exercises/all"
      );
      setExercises(response.data);
    };
    fetchExercises();
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
  console.log(exercises);
  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      {exercises.map((e: any) => {
        return (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>{e.exercisename}</Text>
            <Text>{e.muscletype}</Text>
            {e.othermusclesworked.map((i: any) => {
              return <Text>{i}</Text>;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default MyWorkoutRoutinesModal;
