import { formatSeconds } from "@/utils/utils";
import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type TimeDisplayProps = {
  value: number;
};

const TimeDisplay: FC<TimeDisplayProps> = ({ value }) => {
  return (
    <View style={{ alignSelf: "center" }}>
      <Text variant="titleLarge">{formatSeconds(value)}</Text>
    </View>
  );
};

export default TimeDisplay;
