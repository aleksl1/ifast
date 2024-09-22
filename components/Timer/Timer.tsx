import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StyleSheet, View } from "react-native";
import { getFastTimeInSeconds } from "@/utils/utils";

type TimerProps = {
  fastLength: number;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  isStarted: boolean;
  initialValue?: number;
};

const Timer: FC<TimerProps> = ({
  fastLength = 0,
  reset,
  setReset,
  isStarted,
  initialValue = 0,
}) => {
  const [timerValue, setTimerValue] = useState(initialValue);
  const [savedTime, setSavedTime] = useState(0); //todo: get value from backend
  const {
    colors: { primary, onPrimary },
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
      //todo: reset fast
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
      <View style={styles.finishTip}>
        <Text style={styles.finishTipText}>🚩</Text>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: { position: "relative", marginBottom: 16 },
  finishTip: { position: "absolute", top: 0, right: -30 },
  finishTipText: { fontSize: 40 },
});
