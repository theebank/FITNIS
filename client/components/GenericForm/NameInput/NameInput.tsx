import { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Card } from "react-native-paper";

const NameInput = ({
  onTextChange,
}: {
  onTextChange: (newText: string) => void;
}) => {
  const [text, setText] = useState<string>("");
  const handleTextChange = (newText: string) => {
    setText(newText);
    onTextChange(newText);
  };
  return (
    <Card>
      <Card.Title title="Workout Name" />
      <Card.Content>
        <TextInput
          placeholder="Enter Workout Name"
          value={text}
          onChangeText={handleTextChange}
        />
      </Card.Content>
    </Card>
  );
};

export default NameInput;
