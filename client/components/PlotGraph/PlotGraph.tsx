import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { PGDataType } from "../../../types/PlotGraphDataTypes";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  //Could be passed as a prop possibly
  backgroundGradientFrom: "#D9D9D9",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#D9D9D9",
  backgroundGradientToOpacity: 1,

  strokeWidth: 3,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   barPercentage: 0.5,
};

const PlotGraph = ({ title, data }: { title: string; data: PGDataType }) => {
  return (
    <View>
      <Card style={{ backgroundColor: "#ee6c4d" }}>
        <Card.Content>
          <Text>{title}</Text>
          <LineChart
            data={data}
            width={screenWidth * 0.8}
            height={220}
            chartConfig={chartConfig}
            withVerticalLines={false}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default PlotGraph;
