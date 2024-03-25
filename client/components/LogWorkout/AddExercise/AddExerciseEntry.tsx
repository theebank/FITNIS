import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { exerciseType } from "../../../../types/DatabaseTypes";
import {
  addToCart,
  removeFromCart,
} from "../../../features/LogWorkout/LogWorkoutSlice";

export default function AddExerciseEntry({
  exercise,
}: {
  exercise: exerciseType;
}) {
  const cart = useSelector((state: RootState) => state.logWorkout.ExerciseCart);
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {cart.includes(exercise.exercisename) ? (
        <Button
          title="-"
          onPress={() => {
            dispatch(removeFromCart(exercise.exercisename));
          }}
        />
      ) : (
        <Button
          title="+"
          onPress={() => {
            dispatch(addToCart(exercise.exercisename));
          }}
        />
      )}
      <Text>{exercise.exercisename}</Text>
    </View>
  );
}
