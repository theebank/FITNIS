import { TouchableOpacity, Text } from "react-native";
import BackStyles from "./BackButtonStyles";

const BackButton = ({
  formPage,
  setFormPage,
  onAdditionalPress,
}: {
  formPage: number;
  setFormPage: React.Dispatch<React.SetStateAction<number>>;
  onAdditionalPress?: () => void;
}) => {
  const handlePress = () => {
    if (onAdditionalPress) {
      onAdditionalPress();
    }
    if (formPage > 0) {
      setFormPage(formPage - 1);
    }
  };
  return (
    <TouchableOpacity
      style={[
        BackStyles.backNextbuttonContainer,
        formPage > 0 && BackStyles.backNextbuttonActive,
      ]}
      onPress={handlePress}
      disabled={formPage == 0}
    >
      <Text
        style={[
          BackStyles.backNextbuttonText,
          formPage > 0 && BackStyles.backNexttextActive,
        ]}
      >
        Back
      </Text>
    </TouchableOpacity>
  );
};
export default BackButton;
