import Card from "@/components/Card";
import { FastDetails } from "@/types/fastTypes";
import { getFastCardSubtitleText } from "@/utils/utils";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function FastListScreen() {
  const [fastList, setFastList] = useState<FastDetails[]>([]);
  //todo get list from api
  const onClear = () => {
    setFastList([]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      // refreshControl={
      //   <RefreshControl refreshing={isLoading} onRefresh={getStoredFasts} />
      // }
    >
      {fastList.length ? (
        fastList
          .reverse()
          .map((fast) => (
            <Card
              key={fast.startTimestamp}
              title={fast.label}
              subtitle={getFastCardSubtitleText(
                fast.startTimestamp!,
                fast.totalTimeSeconds,
              )}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          ))
      ) : (
        <View style={styles.emptyList}>
          <Text>
            W tej zakładce możesz zobaczyć historię postów oraz szczegóły
            każdego zakończonego postu.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  contentContainer: {
    margin: 16,
    gap: 16,
  },
  emptyList: {
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
