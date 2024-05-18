import { Alert, AlertButton, Platform } from "react-native";

export const getFastTimeInSeconds = (hours: number) => hours;

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
