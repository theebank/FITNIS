import { Button, Text, TextInput, View } from "react-native";
import WPPstyles from "../styles/WorkoutPlanPageStyling";
import { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import { workoutType } from "../../types/DatabaseTypes";

const apiUrl = Constants.expoConfig?.extra?.API_URL;
const AddWorkoutModalRender = ({
  workoutPlans,
}: {
  workoutPlans: workoutType[] | null;
}) => {
  const navigation = useNavigation();
  let workoutNameInput = "";

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Create Workout Program" });
  }, []);
  const plansAssociated: number[] = [];

  const WorkoutDetails = ({
    onTextChange,
  }: {
    onTextChange: (newText: string) => void;
  }) => {
    const [text, setText] = useState("");

    const handleTextChange = (newText: string) => {
      setText(newText);
      onTextChange(newText);
    };
    return (
      <Card>
        <Card.Content>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter Workout Name"
            onChangeText={handleTextChange}
            value={text}
          />
        </Card.Content>
      </Card>
    );
  };
  const RenderWorkoutPrograms = () => {
    return (
      <Card>
        <Card.Content>
          {workoutPlans?.map((e: workoutType) => {
            return (
              <View>
                <Text>{e.workoutname}</Text>
                <Button
                  onPress={() => plansAssociated.push(e.workoutid)}
                  title="+"
                ></Button>
              </View>
            );
          })}
        </Card.Content>
      </Card>
    );
  };
  const CreateWorkoutButton = () => {
    const createWorkout = async () => {
      const createProgram = async () => {
        const data = {
          programname: workoutNameInput,
          daysperweek: plansAssociated.length,
          split: "PPL",
          rating: 0,
          plansAssociated: plansAssociated,
        };
        try {
          const response = await axios.post(
            `${apiUrl}/programs/newProgram`,
            data
          );
          console.log("New program successfully created: ", response.data);
        } catch (error) {
          console.error("Error creating new program: ", error);
        }
      };
      createProgram();
    };
    return <Button onPress={createWorkout} title="Create Workout" />;
  };

  const handleChildTextChange = (newText: string) => {
    workoutNameInput = newText;
  };

  return (
    <>
      <View style={WPPstyles.backgroundContainer}>
        <WorkoutDetails onTextChange={handleChildTextChange} />
        {/* Two options  */}
        {/* 1) Make association between workout programs and workout plans */}
        <RenderWorkoutPrograms />
        {/* 2) Create workout program at the time of plan creation */}
        <CreateWorkoutButton />
      </View>
    </>
  );
};

const addWorkoutModal = () => {
  const [workoutPlans, setWorkoutPlans] = useState<workoutType[] | null>(null);
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get(`${apiUrl}/workouts/all`);
      setWorkoutPlans(response.data);
    };
    fetchPlans();
  }, []);
  return (
    <>
      <AddWorkoutModalRender workoutPlans={workoutPlans} />
    </>
  );
};

export default addWorkoutModal;
