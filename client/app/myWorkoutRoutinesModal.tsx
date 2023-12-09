import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-paper";

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
    const Title = () => {
      return <Text>asdf</Text>;
    };
    return (
      <Card
        style={{
          backgroundColor: "#ee6c4d",
          margin: 5,
        }}
      >
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
    <View style={{ display: "flex" }}>
      <FlatList
        data={wRoutines}
        keyExtractor={(item) => item.workoutid.toString()}
        renderItem={({ item, index }) => <RoutineRender item={item} />}
      ></FlatList>
    </View>
  );
};

export default MyWorkoutRoutinesModal;
