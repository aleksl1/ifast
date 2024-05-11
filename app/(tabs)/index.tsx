import { storage } from "@/store/mmkvStorage";
import { globalStyles } from "@/styles/globalStyles";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useMMKVNumber } from "react-native-mmkv";
import { Text, Button } from "react-native-paper";

// const fast16 =

export default function TabOneScreen() {
  const [timerValue, setTimerValue] = useState(0);
  const [savedTime, setSavedTime] = useMMKVNumber("savedTime");
  const hasSavedTime = storage.contains("savedTime");
  const [isStarted, setIsStarted] = useState(false);

  const storeTimeOnUnmount = useCallback(() => {
    const newTime = savedTime ? savedTime + timerValue : timerValue;
    setSavedTime(newTime);
  }, [savedTime, setSavedTime, timerValue]);

  useEffect(() => {
    if (hasSavedTime && savedTime) {
      setTimerValue(savedTime);
      setIsStarted(true);
    }
  }, [hasSavedTime, savedTime]);

  useEffect(() => {
    if (isStarted) {
      const timer = setInterval(() => setTimerValue((t) => t + 1), 1000);
      return () => {
        clearInterval(timer);
        storeTimeOnUnmount();
      };
    }
  }, [isStarted, storeTimeOnUnmount]);

  return (
    <View style={globalStyles.container}>
      <Text>{timerValue}</Text>
      {hasSavedTime ? (
        <Button mode="contained" onPress={() => setIsStarted(true)}>
          Zakończ post
        </Button>
      ) : (
        <Button mode="contained" onPress={() => setIsStarted(true)}>
          Zacznij post
        </Button>
      )}
    </View>
  );
}
