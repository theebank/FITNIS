import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { exerciseType } from "../../../types/DatabaseTypes";

export default function AddExerciseModal() {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [exercises, setExercises] = useState<exerciseType[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
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
  return (
    <View>
      {exerciseTypes.map((e) => {
        return <Text>{e}</Text>;
      })}
    </View>
  );
}
