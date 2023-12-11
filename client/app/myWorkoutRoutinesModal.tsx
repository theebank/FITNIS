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
} from "react-native";
import { Card, FAB } from "react-native-paper";

const MyWorkoutRoutinesModal: React.FC = () => {
  const [wRoutines, setWRoutines] = useState<any>(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchWRoutines = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/workouts/all"
      );
      setWRoutines(response.data);
    };
    fetchWRoutines();
  }, []);

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
          "http://localhost:3000/api/workouts/id/" + item.workoutid
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
            title={item.day}
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
          <Card.Title title={item.day} />
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
