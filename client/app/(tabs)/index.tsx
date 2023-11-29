import { ScrollView, StyleSheet } from "react-native";

import HPstyles from "../../styles/HomePageStyling";

import { Text, View } from "../../components/Themed";
import PlotGraph from "../../components/PlotGraph/PlotGraph";

const WeightData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [145, 147, 150, 152, 155, 160],
      //   color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
      //   strokeWidth: 2,
    },
  ],
};

const WalkingData = {
  labels: ["05-15", "05-16", "05-17", "05-18"],
  datasets: [
    {
      data: [2800, 3686, 2052, 1471],
    },
  ],
};

export default function HomePageScreen() {
  return (
    <View style={HPstyles.backgroundContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={HPstyles.horizontalScrollViewContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View style={HPstyles.plotgraphContainer}>
            <PlotGraph title="Weight (lbs)" data={WeightData} />
          </View>
          <View style={HPstyles.plotgraphContainer}>
            <PlotGraph title="Steps" data={WalkingData} />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
