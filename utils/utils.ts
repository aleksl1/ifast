import { Alert, AlertButton, Platform } from "react-native";

export const getFastTimeInSeconds = (hours: number) =>
  __DEV__ ? hours : hours * 60 * 60; //todo: remove dev when not needed

export const showAlert = (
  title: string,
  message: string = "",
  buttons?: AlertButton[],
) => {
  if (Platform.OS === "web") {
    window.confirm(`${title} ${message}`) &&
      buttons?.length &&
      buttons[0]?.onPress?.();
  } else {
    Alert.alert(title, message, buttons);
  }
};

export const getSecondsFromStartToNow = (start: number) => {
  const now = new Date().getTime();
  const seconds = (now - start) / 1000;
  return +seconds.toFixed();
};

export const formatSeconds = (seconds: number): string => {
  const hours: number = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export const getFastCardSubtitleText = (
  startTimestamp: number,
  totalTime: number,
) => {
  const time = new Date(startTimestamp + totalTime * 1000).toLocaleString(
    "pl",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  return `Zakończono, ${time}`;
};
