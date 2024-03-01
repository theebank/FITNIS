import { StyleSheet } from "react-native";

const CWMStyles = StyleSheet.create({
  backgroundView: { backgroundColor: "#ffffff", height: "100%" },
  EMGView: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  EMGExerciseName: { flex: 2, fontWeight: "bold", marginRight: 10 },
  EMGMuscleType: { flex: 1, color: "#555", marginRight: 10 },
  EMGOtherView: { flex: 1 },
  EMGOtherText: { color: "#888" },
  exerciseNameStyle: { flex: 2, fontWeight: "bold", marginRight: 10 },
  muscleTypeStyle: { flex: 1, color: "#555", marginRight: 10 },
  SelectMuscleGroupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  backNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  backNextbuttonContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  backNextbuttonText: {
    textAlign: "center",
    color: "#007AFF",
    fontWeight: "500",
  },
  backNextbuttonActive: {
    backgroundColor: "#007AFF",
  },
  backNexttextActive: {
    color: "#FFFFFF",
  },
  backNextCreateView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    margin: 10,
  },
  cartScrollView: { flexGrow: 0, maxHeight: 160 },
  exercisesScrollView: { flexGrow: 0, minHeight: 150, maxHeight: 320 },
});

export default CWMStyles;
