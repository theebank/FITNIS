import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const Ratingstars = (Rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Rating) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="black" />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={24} color="black" />);
    }
  }
  return <View style={{ display: "flex", flexDirection: "row" }}>{stars}</View>;
};

export default Ratingstars;
