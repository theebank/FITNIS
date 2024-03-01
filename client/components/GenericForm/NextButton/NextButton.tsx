import { TouchableOpacity, Text } from "react-native";
import NextStyles from "./NextButtonStyles";

const NextButton = ({
  maxPage,
  formPage,
  setFormPage,
  onAdditionalPress,
}: {
  maxPage: number;
  formPage: number;
  setFormPage: React.Dispatch<React.SetStateAction<number>>;
  onAdditionalPress?: () => void;
}) => {
  const handlePress = () => {
    if (onAdditionalPress) {
      onAdditionalPress();
    }
    if (formPage < maxPage) {
      setFormPage(formPage + 1);
    }
  };
  return (
    <TouchableOpacity
      style={[
        NextStyles.backNextbuttonContainer,
        formPage < maxPage && NextStyles.backNextbuttonActive,
      ]}
      onPress={handlePress}
      disabled={formPage == maxPage}
    >
      <Text
        style={[
          NextStyles.backNextbuttonText,
          formPage < maxPage && NextStyles.backNexttextActive,
        ]}
      >
        Next
      </Text>
    </TouchableOpacity>
  );
};

export default NextButton;
