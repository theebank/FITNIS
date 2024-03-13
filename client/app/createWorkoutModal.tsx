import { Entypo, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Link, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Pressable, Button, ScrollView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Constants from "expo-constants";
import { exerciseType } from "../../types/DatabaseTypes";
import CWMStyles from "../styles/CreateWorkoutModalStyling";
import { Card } from "react-native-paper";
import NextButton from "../components/GenericForm/NextButton/NextButton";
import BackButton from "../components/GenericForm/BackButton/BackButton";
import SetsPerExercise from "../components/Program/createProgram/SetsPerExercise/SetsPerExercise";
import NameInput from "../components/GenericForm/NameInput/NameInput";

const MyWorkoutRoutinesModal: React.FC = () => {
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const [exercises, setExercises] = useState<any[]>([]);
  const [exercisesByMG, setExercisesByMG] = useState<any[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);

  const [workoutCart, setWorkoutCart] = useState<any[]>([]);
  const [formPage, setFormPage] = useState<number>(0);
  const navigation = useNavigation();

  const [sets, setSets] = useState<number[]>([]);
  const temporarySets = useRef([...sets]);

  // fetching exercises
  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(`${apiUrl}/exercises/all`);
      setExercises(response.data);
    };
    const fetchExerciseTypes = async () => {
      const response = await axios.get(`${apiUrl}/exercises/alltypes`);
      setExerciseTypes(response.data);
    };
    fetchExercises();
    fetchExerciseTypes();
  }, []);

  // header styling
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Workout Routine",
      headerStyle: {
        backgroundColor: "#3d5a80",
      },
      headerTintColor: "#ffffff",
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const applyChanges = () => {
    setSets(temporarySets.current);
  };

  const accumulateChanges = (idx: number, val: number) => {
    temporarySets.current[idx] = val;
  };
  const setupTemporarySets = () => {
    temporarySets.current = sets;
  };

  const filterExercises = (muscletype: string) => {
    return exercises?.filter((e: exerciseType) => {
      if (e.muscletype == muscletype) {
        return true;
      }
      if (e.othermusclesworked?.find((tmp: string) => tmp == muscletype)) {
        return true;
      }
    });
  };

  // Page 1 Exercise Cart Logic
  const addtoCart = (eID: number) => {
    const foundExercise = exercises?.find(
      (e: exerciseType) => e.exerciseid == eID
    );
    if (foundExercise) {
      foundExercise["sets"] = [];
      setWorkoutCart([...workoutCart, foundExercise]);
      setSets([...sets, 1]);
    }
  };
  const removeFromCart = (idx: number) => {
    const newCart = [...workoutCart];
    newCart.splice(idx, 1);
    setWorkoutCart(newCart);

    const newSets = [...sets];
    newSets.splice(idx, 1);
    setSets(newSets);
  };
  const clearCart = () => {
    setWorkoutCart([]);
    setSets([]);
  };
  // Page 2 Set modification Logic
  const createSetsAttribute = () => {
    setWorkoutCart(
      workoutCart.map((exercise) => {
        exercise.sets.push({ set: null, reps: "", rpe: null, notes: "" });
        return {
          ...exercise,
        };
      })
    );
  };

  // Page 3 Workout Name Input logic
  let workoutNameInput = "";
  const handleChildTextChange = (newText: string) => {
    workoutNameInput = newText;
  };

  // TODO Sample Desired Data
  // const TestData = {
  //   programname: "Test",
  //   exercises: [
  //     {
  //       exerciseid: 5,
  //       exercisename: "Chest Press Machine",
  //       muscletype: "Chest",
  //       othermusclesworked: ["Triceps", "Shoulders"],
  //       sets: [
  //         { set: 1, reps: "6-8", rpe: 7, notes: "Squeeze chest" },
  //         { set: 1, reps: "6-8", rpe: 7, notes: "Squeeze chest" },
  //         { set: 1, reps: "6-8", rpe: 7, notes: "Squeeze chest" },
  //       ],
  //     },
  //   ],
  // };

  const createWorkout = async () => {
    const data = {
      programname: workoutNameInput,
      exercises: workoutCart,
    };
    console.log(data.exercises[0]);
    // try {
    //   const wResponse = await axios.post(`${apiUrl}/workouts/newWorkout`, data);
    //   // workoutCart.map((e: any) => {});
    //   console.log(wResponse);
    // } catch (error) {
    //   console.error("Error creating new workout: ", error);
    // }
  };

  const ExerciseByMG = ({ e }: { e: exerciseType }) => {
    return (
      <Pressable onPress={() => addtoCart(e.exerciseid)}>
        <View style={CWMStyles.EMGView}>
          <Text style={CWMStyles.exerciseNameStyle}>{e.exercisename}</Text>
          <Text style={CWMStyles.muscleTypeStyle}>{e.muscletype}</Text>
          <View style={CWMStyles.EMGOtherView}>
            {e.othermusclesworked[0] != "" &&
              e.othermusclesworked.map((i: string, index: number) => {
                return (
                  <Text key={index} style={CWMStyles.EMGOtherText}>
                    • {i}
                  </Text>
                );
              })}
          </View>
        </View>
      </Pressable>
    );
  };
  const ExerciseInCart = ({ e, idx }: { e: exerciseType; idx: number }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={CWMStyles.exerciseNameStyle}>{e.exercisename}</Text>
        <Pressable onPress={() => removeFromCart(idx)}>
          <FontAwesome name="trash" size={24} color="black" />
        </Pressable>
      </View>
    );
  };
  const BottomButtons = () => {
    return (
      <View style={CWMStyles.backNextCreateView}>
        <BackButton
          formPage={formPage}
          setFormPage={setFormPage}
          // onAdditionalPress={applyChanges}
        />
        <Link href="/myWorkoutRoutinesModal" asChild>
          <Button
            onPress={() => {
              createWorkout();
            }}
            title="Create Workout"
          />
        </Link>
        <NextButton
          maxPage={2}
          formPage={formPage}
          setFormPage={setFormPage}
          onAdditionalPress={createSetsAttribute}
        />
      </View>
    );
  };

  // Step 1: add exercises to workout cart
  if (formPage == 0) {
    return (
      <View style={CWMStyles.backgroundView}>
        <SelectDropdown
          defaultButtonText="Select a Muscle Group"
          data={exerciseTypes}
          buttonStyle={CWMStyles.SelectMuscleGroupButton}
          onSelect={(selectedItem) => {
            setExercisesByMG(filterExercises(selectedItem));
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
        {exercisesByMG?.length > 0 && (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <ScrollView style={CWMStyles.exercisesScrollView}>
                {exercisesByMG?.map((e: exerciseType, index: number) => (
                  <ExerciseByMG e={e} key={e.exercisename + "" + index} />
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        )}
        {workoutCart.length > 0 && (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title="Exercise Cart"
              titleStyle={{ alignSelf: "center" }}
              style={{
                justifyContent: "center",
                borderColor: "#3d5a80",
              }}
            />
            <Card.Content>
              <ScrollView style={CWMStyles.cartScrollView}>
                {workoutCart?.map((e: exerciseType, idx: number) => (
                  <ExerciseInCart e={e} idx={idx} key={"WorkoutCart" + idx} />
                ))}

                <Button
                  onPress={() => {
                    clearCart();
                  }}
                  title="Clear Cart"
                />
              </ScrollView>
            </Card.Content>
          </Card>
        )}
        <BottomButtons />
      </View>
    );
  }
  if (formPage == 1) {
    return (
      <>
        <View>
          {workoutCart.map((exercise: any) => {
            return <SetsPerExercise exercise={exercise} />;
          })}
        </View>
        <BottomButtons />
      </>
    );
  }
  return (
    <>
      <View>
        <NameInput onTextChange={handleChildTextChange} />
      </View>
      <BottomButtons />
    </>
  );
};

export default MyWorkoutRoutinesModal;
