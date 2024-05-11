import { storage } from "@/store/mmkvStorage";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMMKVNumber } from "react-native-mmkv";
import { Button, useTheme } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View } from "react-native";
import { getFastTimeInSeconds } from "@/utils/utils";

type TimerProps = {
  fastLength: number;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
};

const Timer: FC<TimerProps> = ({ fastLength, reset, setReset }) => {
  const [timerValue, setTimerValue] = useState(0);
  const [savedTime, setSavedTime] = useMMKVNumber("savedTime");

  const [isStarted, setIsStarted] = useState(false);
  const {
    colors: { primary, secondary },
  } = useTheme();

  const onEnd = () => {
    setIsStarted(false);
    storage.delete("savedTime");
    setTimerValue(0);
  };

  const onStart = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (savedTime) {
      setTimerValue(savedTime);
      setIsStarted(true);
    }
  }, [savedTime]);

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
      setIsStarted(false);
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
      {isStarted ? (
        <Button mode="contained" onPress={onEnd}>
          Zakończ post
        </Button>
      ) : (
        <Button mode="contained" onPress={onStart}>
          Zacznij post
        </Button>
      )}
    </View>
  );
};

export default Timer;
