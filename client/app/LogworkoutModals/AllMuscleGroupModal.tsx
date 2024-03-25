import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

import {
  decrement,
  increment,
  incrementArray,
} from "../../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function AllMuscleGroupModal() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const array = useSelector((state: RootState) => state.counter.valarray);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);
  return (
    <View>
      <Button title="increment" onPress={() => dispatch(increment())} />
      <Text>{count}</Text>
      <Button title="decrement" onPress={() => dispatch(decrement())} />
      {array.map(() => {
        return <Text>Test</Text>;
      })}
      <Button
        title="increment array"
        onPress={() => dispatch(incrementArray())}
      />
    </View>
  );
}
