import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, View, useColorScheme, Text } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const LogWorkoutTabIcon = ({ focused }: { focused: any }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          // The following styles are for the circular background
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: focused ? "#98C1D9" : "#EE6C4D", // orange background
        }}
      >
        <MaterialCommunityIcons name="dumbbell" size={24} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 10,
            fontWeight: "bold",
            marginTop: -3,
          }}
        >
          Log Workout
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EE6C4D",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: { backgroundColor: "#3d5a80" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#3d5a80" },
          headerTitleStyle: { color: "#ffffff" },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Programs"
        options={{
          title: "Programs",
          headerStyle: { backgroundColor: "#3d5a80" },
          headerTitleStyle: { color: "#ffffff" },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="LogWorkout"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#3d5a80" },
          headerTitleStyle: { color: "#ffffff" },
          tabBarIcon: ({ focused }) => <LogWorkoutTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Workouts"
        options={{
          title: "Workouts",
          headerStyle: { backgroundColor: "#3d5a80" },
          headerTitleStyle: { color: "#ffffff" },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="progress-clock"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="one"
        options={{
          title: "Tab One",
          headerStyle: { backgroundColor: "#3d5a80" },
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
