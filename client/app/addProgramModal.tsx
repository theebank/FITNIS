import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import WPPstyles from "../styles/WorkoutPlanPageStyling";
import { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import { workoutType } from "../../types/DatabaseTypes";
import RenderWorkoutPrograms from "../components/Program/createProgram/RenderWorkoutPrograms/RenderWorkoutPrograms";

const apiUrl = Constants.expoConfig?.extra?.API_URL;
const AddWorkoutModalRender = ({
  workoutPlans,
}: {
  workoutPlans: workoutType[] | null;
}) => {
  const [formPage, setFormPage] = useState(0);
  const navigation = useNavigation();
  let workoutNameInput = "";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Workout Program",
      headerStyle: {
        backgroundColor: "#3d5a80",
      },
      headerTintColor: "#ffffff",
    });
  }, []);
  const [plansAssociated, setPlansAssociated] = useState<number[]>([]);

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
      <Card style={{ margin: 5 }}>
        <Card.Title title="Workout Name" />
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

  const RenderWorkoutCart = () => {
    return (
      <Card style={{ margin: 5 }}>
        <Card.Title title="Routine(s) added" />
        <Card.Content>
          {plansAssociated.map((e, key) => {
            return (
              <Text key={key}>
                {workoutPlans?.find((p) => p.workoutid == e)?.workoutname}
              </Text>
            );
          })}
        </Card.Content>
      </Card>
    );
  };

  const CreateProgramButton = () => {
    const createProgram = async () => {
      const data = {
        programname: workoutNameInput,
        daysperweek: plansAssociated.length,
        split: "PPL",
        rating: 0,
        plansAssociated: plansAssociated,
      };
      console.log(data);
      // try {
      //   const response = await axios.post(
      //     `${apiUrl}/programs/newProgram`,
      //     data
      //   );
      //   console.log("New program successfully created: ", response.data);
      // } catch (error) {
      //   console.error("Error creating new program: ", error);
      // }
    };
    return <Button onPress={() => createProgram()} title="Create Program" />;
  };

  const handleChildTextChange = (newText: string) => {
    workoutNameInput = newText;
  };

  const PageOne = () => {
    return (
      <>
        {/* Two options  */}
        {/* 1) Make association between workout programs and workout plans */}
        {/* 2) Create workout program at the time of plan creation */}
        <RenderWorkoutPrograms
          plansAssociated={plansAssociated}
          setPlansAssociated={setPlansAssociated}
          workoutPlans={workoutPlans}
        />
        {/* Render Workout Cart somehow */}
        {plansAssociated.length > 0 && <RenderWorkoutCart />}
      </>
    );
  };
  const PageTwo = () => {
    return (
      <>
        <WorkoutDetails onTextChange={handleChildTextChange} />
      </>
    );
  };
  const NextButton = () => {
    return (
      <TouchableOpacity
        style={[
          WPPstyles.backNextbuttonContainer,
          formPage > 0 && WPPstyles.backNextbuttonActive,
        ]}
        onPress={() => {
          if (formPage > 0) {
            setFormPage(formPage - 1);
          }
        }}
        disabled={formPage == 0}
      >
        <Text
          style={[
            WPPstyles.backNextbuttonText,
            formPage > 0 && WPPstyles.backNexttextActive,
          ]}
        >
          Back
        </Text>
      </TouchableOpacity>
    );
  };
  const BackButton = () => {
    return (
      <TouchableOpacity
        style={[
          WPPstyles.backNextbuttonContainer,
          formPage < 1 && WPPstyles.backNextbuttonActive,
        ]}
        onPress={() => {
          if (formPage < 1) {
            setFormPage(formPage + 1);
          }
        }}
        disabled={formPage == 1}
      >
        <Text
          style={[
            WPPstyles.backNextbuttonText,
            formPage < 1 && WPPstyles.backNexttextActive,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={WPPstyles.backgroundContainer}>
        {formPage == 0 && <PageOne />}
        {formPage == 1 && <PageTwo />}
        <View style={WPPstyles.backNextContainer}>
          <NextButton />
          {formPage == 1 && <CreateProgramButton />}
          <BackButton />
        </View>
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
