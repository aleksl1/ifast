import { handleSignIn } from "@/api/auth";
import { router } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface SignInScreenProps {}

const SignInScreen: FC<SignInScreenProps> = () => {
  const onPressSignIn = () => {
    handleSignIn();
    router.replace("/");
  };

  return (
    <View style={{ margin: 16, flex: 1, justifyContent: "center" }}>
      <Button mode="contained" onPress={onPressSignIn}>
        Zaloguj
      </Button>
      <Button>Zarejestruj się</Button>
    </View>
  );
};

export default SignInScreen;
