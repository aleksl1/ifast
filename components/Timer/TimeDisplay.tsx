import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type TimeDisplayProps = {
  value: number;
};

const TimeDisplay: FC<TimeDisplayProps> = ({ value }) => {
  const formatSeconds = (seconds: number): string => {
    const hours: number = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };
  return (
    <View style={{ alignSelf: "center" }}>
      <Text variant="titleLarge">{formatSeconds(value)}</Text>
    </View>
  );
};

export default TimeDisplay;
