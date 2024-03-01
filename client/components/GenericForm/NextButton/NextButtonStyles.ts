import { StyleSheet } from "react-native";

const NextStyles = StyleSheet.create({
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
});

export default NextStyles;
