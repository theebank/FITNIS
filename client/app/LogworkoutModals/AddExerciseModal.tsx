import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { exerciseType } from "../../../types/DatabaseTypes";
import { Link, useNavigation } from "expo-router";

export default function AddExerciseModal() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [exercises, setExercises] = useState<exerciseType[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const navigation = useNavigation();
  const [exercisesByMG, setExercisesByMG] = useState<exerciseType[]>(exercises);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(`${apiUrl}/exercises/all`);
      setExercises(response.data);
      setExercisesByMG(response.data);
    };
    const fetchExerciseTypes = async () => {
      const response = await axios.get(`${apiUrl}/exercises/alltypes`);
      setExerciseTypes(response.data);
    };
    fetchExercises();
    fetchExerciseTypes();
    navigation.setOptions({
      title: "Add An Exercise",
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#3d5a80" },
      headerTintColor: "#ffffff",
    });
  }, []);

  return (
    <View>
      <Text>Search</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {/* <Button title="All Equipment" /> */}
        <Link href="/LogworkoutModals/AllMuscleGroupModal" asChild>
          <Button title="All Muscle Groups" />
        </Link>
      </View>
      {/* Results */}
      <ScrollView>
        {exercises.map((e) => {
          return <Text>{e.exercisename}</Text>;
        })}
      </ScrollView>
    </View>
  );
}
