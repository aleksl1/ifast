import Timer from "@/components/Timer/Timer";
import { globalStyles } from "@/styles/globalStyles";
import { View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={globalStyles.container}>
      <Timer />
    </View>
  );
}
