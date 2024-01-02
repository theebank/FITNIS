import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Link, useNavigation, useFocusEffect } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import Constants from "expo-constants";

const MyWorkoutRoutinesModal: React.FC = () => {
  let apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [wRoutines, setWRoutines] = useState<any>(null);
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

  const RoutineRender = ({ item }: { item: any }) => {
    const [workoutdetails, setWorkoutdetails] = useState<any>(null);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
      const fetchWDetails = async () => {
        const response = await axios.get(
          `${apiUrl}/workouts/id/` + item.workoutid
        );
        setWorkoutdetails(response.data);
      };
      fetchWDetails();
    }, []);
    return (
      <Card
        style={{
          backgroundColor: "#ee6c4d",
          margin: 5,
        }}
      >
        {workoutdetails?.exercises.length > 0 ? (
          <Card.Title
            title={item.workoutname}
            right={(props) =>
              clicked ? (
                <Entypo
                  name="chevron-down"
                  size={24}
                  color="black"
                  onPress={() => {
                    setClicked(!clicked);
                  }}
                />
              ) : (
                <Entypo
                  name="chevron-up"
                  size={24}
                  color="black"
                  onPress={() => {
                    setClicked(!clicked);
                  }}
                />
              )
            }
          />
        ) : (
          <Card.Title title={item.workoutname} />
        )}
        {clicked && (
          <Card.Content style={{ backgroundColor: "#e0fbfc" }}>
            <View>
              {workoutdetails?.exercises.map((e: any) => {
                return (
                  <View>
                    <Text>{e.exercisename}</Text>
                    <Text>
                      {e.sets}x{e.reps}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Card.Content>
        )}
      </Card>
    );
  };
  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      {wRoutines ? (
        <FlatList
          data={wRoutines}
          keyExtractor={(item) => item.workoutid.toString()}
          renderItem={({ item, index }) => <RoutineRender item={item} />}
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
