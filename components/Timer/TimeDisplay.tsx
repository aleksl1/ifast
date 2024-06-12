import { formatSeconds } from "@/utils/utils";
import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

type TimeDisplayProps = {
  value: number;
};

const TimeDisplay: FC<TimeDisplayProps> = ({ value }) => {
  const {
    colors: { primary },
  } = useTheme();
  return (
    <View style={{ alignSelf: "center" }}>
      <Text
        variant="headlineLarge"
        style={{ fontWeight: "bold", color: primary }}
      >
        {formatSeconds(value)}
      </Text>
    </View>
  );
};

export default TimeDisplay;
