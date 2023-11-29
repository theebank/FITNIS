import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Ratingstars from "../RatingStars/RatingStars";
import Pstyles from "./ProgramStyling";

type Query = {
  WorkoutProgram: any;
  ProgramID: any;
};

const Program = ({
  ProgramDetails,
  removePlan,
  index,
}: {
  ProgramDetails: any;
  removePlan: Function;
  index: any;
}) => {
  return (
    <View key={ProgramDetails.id}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            onPress={() =>
              removePlan(
                ProgramDetails.ProgramName,
                ProgramDetails.DaysPerWeek,
                ProgramDetails.Split,
                ProgramDetails.Rating
              )
            }
          >
            <View style={Pstyles.trashIcon}>
              <FontAwesome name="trash" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      >
        <Card style={Pstyles.cardContainer}>
          <Card.Content>
            <View>
              <Pressable>
                <View style={Pstyles.cardView}>
                  <Link
                    href={{
                      pathname: "/[WorkoutModal]",
                      params: {
                        ProgramName: ProgramDetails.ProgramName,
                        DaysPerWeek: ProgramDetails.DaysPerWeek,
                        Split: ProgramDetails.Split,
                        ProgramID: ProgramDetails.id,
                      },
                    }}
                    asChild
                  >
                    <Text>{ProgramDetails.ProgramName}</Text>
                  </Link>
                  <View style={Pstyles.programInfoView}>
                    <Text>Days/Week: {ProgramDetails.DaysPerWeek}</Text>
                    <Text>Split: {ProgramDetails.Split}</Text>
                    <Ratingstars Rating={ProgramDetails.Rating} />
                  </View>
                </View>
              </Pressable>
            </View>
          </Card.Content>
        </Card>
      </Swipeable>
    </View>
  );
};

export default Program;
