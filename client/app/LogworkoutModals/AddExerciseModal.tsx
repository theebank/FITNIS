import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { exerciseType } from "../../../types/DatabaseTypes";
import { Link, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../features/LogWorkout/LogWorkoutSlice";
import {
  redefineTypes,
  redefineExercises,
} from "../../features/Exercises/ExerciseSlice";
import AddExerciseEntry from "../../components/LogWorkout/AddExercise/AddExerciseEntry";

export default function AddExerciseModal() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const navigation = useNavigation();

  const cart = useSelector((state: any) => state.logWorkout.ExerciseCart);
  const exercises: exerciseType[] = useSelector(
    (state: any) => state.exercises.Exercises
  );
  const exerciseTypes: string[] = useSelector(
    (state: any) => state.exercises.exerciseTypes
  );
  const dispatch = useDispatch();

  const [exercisesByMG, setExercisesByMG] = useState<exerciseType[]>(exercises);
  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(`${apiUrl}/exercises/all`);
      if (response.data != exercises) {
        dispatch(redefineExercises(response.data));
      }
      setExercisesByMG(response.data);
    };
    const fetchExerciseTypes = async () => {
      const response = await axios.get(`${apiUrl}/exercises/alltypes`);
      if (response.data != exerciseTypes) {
        dispatch(redefineTypes(response.data));
      }
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
          return <AddExerciseEntry exercise={e} />;
        })}
      </ScrollView>
    </View>
  );
}
