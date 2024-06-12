import { storage } from "@/store/mmkvStorage";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMMKVNumber } from "react-native-mmkv";
import { Text, useTheme } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StyleSheet, View } from "react-native";
import { getFastTimeInSeconds } from "@/utils/utils";
import { keys } from "@/store/storageKeys";

type TimerProps = {
  fastLength: number;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  isStarted: boolean;
  initialValue?: number;
};

const Timer: FC<TimerProps> = ({
  fastLength,
  reset,
  setReset,
  isStarted,
  initialValue = 0,
}) => {
  const [timerValue, setTimerValue] = useState(initialValue);
  const [savedTime, setSavedTime] = useMMKVNumber(keys.savedTime);
  const {
    colors: { primary, onPrimary, primaryContainer },
  } = useTheme();

  useEffect(() => {
    setSavedTime(initialValue);
    setTimerValue(initialValue);
  }, [initialValue, setSavedTime]);

  useEffect(() => {
    if (isStarted && !reset) {
      const timer = setInterval(() => {
        setTimerValue((t) => t + 1);
        setSavedTime(savedTime ? savedTime + 1 : 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isStarted, reset, savedTime, setSavedTime]);

  useEffect(() => {
    if (reset) {
      setTimerValue(0);
      storage.delete(keys.savedTime);
      setReset(false);
    }
  }, [reset, setReset]);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={12}
        backgroundWidth={16}
        fill={(timerValue * 100) / getFastTimeInSeconds(fastLength)}
        tintColor={onPrimary}
        tintTransparency={true}
        lineCap="round"
        backgroundColor={primary}
        style={{ alignSelf: "center" }}
        padding={4}
        arcSweepAngle={340}
        duration={100}
      >
        {() => <TimeDisplay value={timerValue} />}
      </AnimatedCircularProgress>
      {/* <View style={styles.tip1}>
        <Text>TIP 1</Text>
      </View> */}
      {/* <View style={[styles.tip2, { backgroundColor: primaryContainer }]}>
        <Text style={[styles.tip2text, { color: primary }]}>Jesteś</Text>
        <Text style={[styles.tip2text, { color: primary }]}>blisko mety!</Text>
      </View> */}
      <View style={styles.tip3}>
        <Text style={styles.tip3text}>🚩</Text>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: { position: "relative", marginBottom: 16 },
  tip1: { position: "absolute", bottom: 0, left: 0 },
  tip2: { position: "absolute", top: -60, left: -30, borderRadius: 5 },
  tip3: { position: "absolute", top: 0, right: -30 },
  tip2text: {
    fontSize: 20,
    padding: 4,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  tip3text: { fontSize: 40 },
});
