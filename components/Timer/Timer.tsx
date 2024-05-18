import { storage } from "@/store/mmkvStorage";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMMKVNumber } from "react-native-mmkv";
import { useTheme } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View } from "react-native";
import { getFastTimeInSeconds } from "@/utils/utils";

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
  const [savedTime, setSavedTime] = useMMKVNumber("savedTime");
  const {
    colors: { primary, secondary },
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
      storage.delete("savedTime");
      setReset(false);
    }
  }, [reset, setReset]);

  return (
    <View style={{ gap: 16 }}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(timerValue * 100) / getFastTimeInSeconds(fastLength)}
        tintColor={secondary}
        backgroundColor={primary}
        style={{ alignSelf: "center" }}
      >
        {() => <TimeDisplay value={timerValue} />}
      </AnimatedCircularProgress>
    </View>
  );
};

export default Timer;
