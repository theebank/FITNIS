import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import WPPstyles from "../styles/WorkoutPlanPageStyling";
import { useLayoutEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Card } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TestExercises } from "../constants/TestExercises";
import { TestData } from "../constants/TestWorkouts";
import { exerciseType } from "../types/Exercise";
import RenderExercise from "../components/Program/RenderExercise/RenderExercise";

const addWorkoutModal = () => {
  const [workoutDay, setWorkoutDay] = useState(1);
  const [workoutDays, setworkoutDays] = useState("0");

  const [currentDayPlan, setCurrentDayPlan] = useState<exerciseType[]>([]);
  // const [workoutplan, setWorkoutplan] = useState<exerciseType[][]>([]);
  var workoutplan: exerciseType[][] = [];

  const navigation = useNavigation();
  const [selectedType, setselectedType] = useState(null);

  const [workoutNameInput, setWorkoutNameInput] = useState("");

  const exerciseTypes = [
    "Chest",
    "Shoulders",
    "Quads",
    "Hamstrings",
    "Back",
    "Biceps",
    "Triceps",
    "Calves",
    "Lower Back",
  ];
  const daysToWorkout = ["1", "2", "3", "4", "5", "6", "7"];
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Add Workout" });
  }, []);

  const addToPlan = (newExercise: exerciseType) => {
    setCurrentDayPlan([...currentDayPlan, newExercise]);
  };
  const removeFromPlan = (exerciseToRemove: exerciseType) => {
    setCurrentDayPlan(currentDayPlan.filter((e) => e !== exerciseToRemove));
  };
  const leftChangeDay = () => {
    if (workoutDay > 1) {
      let newWorkoutPlan = [...workoutplan];
      newWorkoutPlan[workoutDay - 1] = currentDayPlan;
      workoutplan = newWorkoutPlan;
      if (workoutplan[workoutDay - 1]) {
        setCurrentDayPlan(workoutplan[workoutDay - 1]);
      } else {
        setCurrentDayPlan([]);
      }
      setWorkoutDay(workoutDay - 1);
    }
  };
  const rightChangeDay = () => {
    if (workoutDay.toString() < workoutDays) {
      let newWorkoutPlan = [...workoutplan];
      newWorkoutPlan[workoutDay - 1] = currentDayPlan;
      workoutplan = newWorkoutPlan;
      if (workoutplan[workoutDay + 1]) {
        setCurrentDayPlan(workoutplan[workoutDay + 1]);
      } else {
        setCurrentDayPlan([]);
      }

      setWorkoutDay(workoutDay + 1);
    }
  };
  const exercisesToRender = TestExercises.filter(
    (e) => e.muscletype === selectedType
  );
  const createWorkout = () => {
    TestData.push({
      id: TestData[TestData.length - 1].id + 1,
      ProgramName: workoutNameInput,
      DaysPerWeek: 0,
      Split: "PPL",
      Rating: 0,
      Workouts: [],
    });
  };
  const handleTextInputChange = (text: string) => {
    setWorkoutNameInput(text);
  };
  return (
    <View style={WPPstyles.backgroundContainer}>
      <Card>
        <Card.Content>
          <TextInput
            placeholder="Enter Workout Name"
            value={workoutNameInput}
            onChangeText={handleTextInputChange}
          ></TextInput>
          <SelectDropdown
            defaultButtonText="Select Days/Week"
            data={daysToWorkout}
            buttonStyle={{
              width: "100%",
              height: 50,
              backgroundColor: "#FFF",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#444",
            }}
            onSelect={(e) => {
              if (e != workoutDays) {
                setworkoutDays(e);
              }
            }}
            dropdownIconPosition="right"
            renderDropdownIcon={(isOpened) => {
              return (
                <Entypo
                  name={isOpened ? "chevron-down" : "chevron-up"}
                  size={24}
                  color="black"
                />
              );
            }}
          />
        </Card.Content>
      </Card>
      {workoutDays !== "0" && (
        <>
          <Card>
            <Card.Content>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <SelectDropdown
                  defaultButtonText="Select a Muscle Group"
                  data={exerciseTypes}
                  buttonStyle={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "#FFF",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#444",
                  }}
                  onSelect={(selectedItem) => {
                    if (selectedItem != selectedType) {
                      setselectedType(selectedItem);
                    }
                  }}
                  dropdownIconPosition="right"
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <Entypo
                        name={isOpened ? "chevron-down" : "chevron-up"}
                        size={24}
                        color="black"
                      />
                    );
                  }}
                />
                {selectedType !== null && (
                  <View style={{ display: "flex", width: "100%" }}>
                    <FlatList
                      data={exercisesToRender}
                      keyExtractor={(item, index) =>
                        item.name + index.toString()
                      }
                      renderItem={({ item }) => (
                        <RenderExercise
                          Exercise={item}
                          key={item.name + "RenderExercise"}
                          addToPlan={addToPlan}
                          removeFromPlan={removeFromPlan}
                          workoutplan={currentDayPlan}
                        />
                      )}
                      showsVerticalScrollIndicator={true}
                    ></FlatList>
                  </View>
                )}
              </View>
            </Card.Content>
          </Card>
        </>
      )}
      {currentDayPlan.length !== 0 && (
        <Card>
          <Card.Content>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={leftChangeDay}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </Pressable>
              <View style={{ justifyContent: "center" }}>
                <Text>{"Day :" + workoutDay}</Text>
              </View>
              <Pressable onPress={rightChangeDay}>
                <AntDesign name="arrowright" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              {currentDayPlan.map((e) => {
                return <Text key={e.name + "workoutcart"}>{e.name}</Text>;
              })}
              <Button
                title="Clear current day"
                onPress={() => setCurrentDayPlan([])}
              ></Button>
            </View>
          </Card.Content>
        </Card>
      )}
      <Card>
        <Card.Content>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Button title="Create Workout" onPress={createWorkout}></Button>
            <Button
              title="Remove all exercises"
              onPress={() => {
                workoutplan = [];
                setCurrentDayPlan([]);
              }}
            ></Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default addWorkoutModal;
