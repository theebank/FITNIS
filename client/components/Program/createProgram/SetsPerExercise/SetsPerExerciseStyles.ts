import { StyleSheet } from "react-native";

const SPEStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  exerciseText: {
    flex: 2,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
  },
  setsText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  renderSet: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
    alignItems: "center",
  },
});

export default SPEStyles;
