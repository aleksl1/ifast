import { storage } from "@/store/mmkvStorage";
import { FC, useEffect, useState } from "react";
import { useMMKVNumber } from "react-native-mmkv";
import { Button } from "react-native-paper";
import TimeDisplay from "./TimeDisplay";

const Timer: FC = () => {
  const [timerValue, setTimerValue] = useState(0);
  const [savedTime, setSavedTime] = useMMKVNumber("savedTime");
  const [isStarted, setIsStarted] = useState(false);

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
    <>
      <TimeDisplay value={timerValue} />
      {isStarted ? (
        <Button mode="contained" onPress={onEnd}>
          Zakończ post
        </Button>
      ) : (
        <Button mode="contained" onPress={onStart}>
          Zacznij post
        </Button>
      )}
    </>
  );
};

export default Timer;
