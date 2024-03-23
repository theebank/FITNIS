import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function AllMuscleGroupModal() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, []);
  return (
    <View>
      <Text>All Muscle Group Modal</Text>
    </View>
  );
}
