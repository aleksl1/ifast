import AuthForm from "@/components/forms/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

interface SignInScreenProps {}

const SignInScreen: FC<SignInScreenProps> = () => {
  const { user, isAuthenticated } = useAuth();
  console.log({ user });

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return (
    <View style={{ margin: 16, flex: 1, justifyContent: "center" }}>
      <AuthForm />
    </View>
  );
};

export default SignInScreen;
