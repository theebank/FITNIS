import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { exerciseType } from "../../../../types/DatabaseTypes";
import {
  addToCart,
  removeFromCart,
} from "../../../features/LogWorkout/LogWorkoutSlice";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function AddExerciseEntry({
  exercise,
}: {
  exercise: exerciseType;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Close"
          onPress={() => navigation.goBack()}
          color="white"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Button
        title="+"
        onPress={() => {
          dispatch(addToCart(exercise));
          navigation.goBack();
        }}
      />
      <Text>{exercise.exercisename}</Text>
    </View>
  );
}
