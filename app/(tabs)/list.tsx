import { useFastList } from "@/hooks/useFastList";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function FastListScreen() {
  const { fastList, clearStoredFasts } = useFastList();
  console.log("xxx", fastList);
  return (
    <View style={styles.container}>
      <Button onPress={clearStoredFasts}> clear</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
