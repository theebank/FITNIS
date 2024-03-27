import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { exerciseType } from "../../../types/DatabaseTypes";
import { Link, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  redefineTypes,
  redefineExercises,
} from "../../features/Exercises/ExerciseSlice";
import AddExerciseEntry from "../../components/LogWorkout/AddExercise/AddExerciseEntry";
import { RootState } from "../../store/store";

export default function AddExerciseModal() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const navigation = useNavigation();

  const exercises: exerciseType[] = useSelector(
    (state: RootState) => state.exercises.Exercises
  );
  const exerciseTypes: string[] = useSelector(
    (state: RootState) => state.exercises.exerciseTypes
  );
  const dispatch = useDispatch();

  const [exercisesByMG, setExercisesByMG] = useState<exerciseType[]>(exercises);
  // console.log(exercisesByMG);
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
