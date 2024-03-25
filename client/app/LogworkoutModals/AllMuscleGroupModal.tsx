import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

import {
  decrement,
  increment,
  incrementByAmount,
  incrementArray,
} from "../../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AllMuscleGroupModal() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const array = useSelector((state: any) => state.counter.valarray);

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
