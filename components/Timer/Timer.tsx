import { storage } from "@/store/mmkvStorage";
import { FC, useEffect, useState } from "react";
import { useMMKVNumber } from "react-native-mmkv";
import { Button, useTheme } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View } from "react-native";

const fastLength = 60;

const Timer: FC = () => {
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
    if (isStarted) {
      const timer = setInterval(() => {
        setTimerValue((t) => t + 1);
        setSavedTime(savedTime ? savedTime + 1 : 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isStarted, savedTime, setSavedTime]);

  return (
    <View style={{ gap: 16 }}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(timerValue * 100) / fastLength}
        tintColor={secondary}
        onAnimationComplete={() => console.log("onAnimationComplete")}
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
