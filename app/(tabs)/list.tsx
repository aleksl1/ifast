import Card from "@/components/Card";
import { useFastList } from "@/hooks/useFastList";
import { FastDetails } from "@/types/fastTypes";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function FastListScreen() {
  const { fastList: storedFasts, clearStoredFasts } = useFastList();
  const [fastList, setFastList] = useState<FastDetails[]>([]);
  console.log("xxx", fastList);
  console.log("storedFasts", storedFasts);
  useEffect(() => {
    storedFasts && setFastList(storedFasts);
  }, [storedFasts]);

  return (
    <View style={styles.container}>
      {fastList.length && fastList.map((fast) => <Card />)}
      <Button onPress={clearStoredFasts}> clear</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
