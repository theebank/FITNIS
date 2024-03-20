import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Timer() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const formattedTime = `${hours > 0 ? `${hours}h ` : ""}${
    minutes > 0 || hours > 0 ? `${minutes}min ` : ""
  }${seconds}s `;

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text>Time Elapsed: </Text>
      <Text>{formattedTime}</Text>
    </View>
  );
}
