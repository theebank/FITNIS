import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function LogWorkout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Workout</Text>
      <Link href="/freeStyleWorkout" asChild>
        <Button title="Start Freestyle Workout" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
