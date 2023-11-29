import { StyleSheet } from "react-native";

const Pstyles = StyleSheet.create({
  trashIcon: {
    width: 40,
    height: 40,
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  cardContainer: {
    margin: 5,
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
  },
  programInfoView: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
});

export default Pstyles;
