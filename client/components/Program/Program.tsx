import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import Ratingstars from "../RatingStars/RatingStars";
import Pstyles from "./ProgramStyling";
import { programType } from "../../../types/DatabaseTypes";

const Program = ({
  ProgramDetails,
  removePlan,
}: {
  ProgramDetails: programType;
  removePlan: (
    PName: string,
    Days: number,
    Split: string,
    Rate: number
  ) => void;
}) => {
  return (
    <View key={ProgramDetails.programid}>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            onPress={() =>
              removePlan(
                ProgramDetails.programname,
                ProgramDetails.daysperweek,
                ProgramDetails.split,
                ProgramDetails.rating
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
                        ProgramName: ProgramDetails.programname,
                        DaysPerWeek: ProgramDetails.daysperweek,
                        Split: ProgramDetails.split,
                        ProgramID: ProgramDetails.programid,
                      },
                    }}
                    asChild
                  >
                    <Text>{ProgramDetails.programname}</Text>
                  </Link>
                  <View style={Pstyles.programInfoView}>
                    <Text>Days/Week: {ProgramDetails.daysperweek}</Text>
                    <Text>Split: {ProgramDetails.split}</Text>
                    <Ratingstars Rating={ProgramDetails.rating} />
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
