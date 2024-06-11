import { keys } from "@/store/storageKeys";
import { StyleSheet, View } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import { Avatar, TextInput, Text, Surface } from "react-native-paper";

export default function ProfileScreen() {
  const [name, setName] = useMMKVString(keys.name);

  //todo: waga początkowa, waga aktualna, pierwszy ukończony post - data, ukończonych postów w miesiącu, całkowity czas postów, najwięcej razy ukończono post X,

  //todo: 1 surface z liczbą a obok opis textowy

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={require("../../assets/avatar.jpg")} />
      <TextInput
        label="imie"
        mode="outlined"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <View style={styles.surfaceContainer}>
        <Surface style={styles.surface} elevation={4}>
          <Text variant="titleLarge">0</Text>
          <Text variant="titleSmall" style={{ textAlign: "center" }}>
            ukończonych postów
          </Text>
        </Surface>
        <Surface style={styles.surface} elevation={4}>
          <Text>Surface</Text>
        </Surface>
        <Surface style={styles.surface} elevation={4}>
          <Text variant="titleLarge">0</Text>
          <Text variant="titleSmall" style={{ textAlign: "center" }}>
            ukończonych postów
          </Text>
        </Surface>
        <Surface style={styles.surface} elevation={4}>
          <Text variant="titleLarge">0</Text>
          <Text variant="titleSmall" style={{ textAlign: "center" }}>
            ukończonych postów
          </Text>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    margin: 16,
    marginTop: 24,
    alignItems: "center",
  },
  surfaceContainer: {
    // flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 32,
    margin: 16,
  },
  surface: {
    padding: 8,
    height: 120,
    width: 120,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
    backgroundColor: "white",
  },
});
