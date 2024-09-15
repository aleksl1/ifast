import { FC } from "react";
import { ActivityIndicator } from "react-native-paper";

const Loader: FC = () => {
  return <ActivityIndicator size="large" style={{ flex: 1 }} />;
};

export default Loader;
