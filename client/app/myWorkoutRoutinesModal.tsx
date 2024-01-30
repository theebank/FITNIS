import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Link, useNavigation, useFocusEffect } from "expo-router";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Pressable } from "react-native";
import { FAB } from "react-native-paper";
import Constants from "expo-constants";
import { workoutType } from "../../types/DatabaseTypes";
import RoutineRender from "../components/Routines/RoutineRender/RoutineRender";

const MyWorkoutRoutinesModal: React.FC = () => {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [wRoutines, setWRoutines] = useState<workoutType[] | null>();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchWRoutines = async () => {
        const response = await axios.get(`${apiUrl}/workouts/all`);
        setWRoutines(response.data);
      };
      fetchWRoutines();
    }, [apiUrl])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Workout Routines",
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

  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      {wRoutines ? (
        <FlatList
          data={wRoutines}
          keyExtractor={(item) => item.workoutid.toString()}
          renderItem={({ item }) => <RoutineRender item={item} />}
        ></FlatList>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Link href="/createWorkoutModal" asChild>
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

export default MyWorkoutRoutinesModal;
