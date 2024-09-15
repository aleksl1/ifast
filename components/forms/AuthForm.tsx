import { FC, useState } from "react";
import { Controller, Field, FieldValues, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ControlledInput from "./ControlledInput";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormProps {}

type AuthFormType = {
  email: string;
  password: string;
};

const AuthForm: FC<AuthFormProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: AuthFormType) => {
    signIn({ email, password });
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        flex: 1,
      }}
    >
      <Button
        onPress={() => signIn({ email: "test@test.pl", password: "123456" })}
      >
        test sign in
      </Button>
      <ControlledInput
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        textInputProps={{
          label: "email",
          textContentType: "emailAddress",
        }}
      />
      <ControlledInput
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        textInputProps={{
          label: "password",
          textContentType: "password",
          secureTextEntry: !showPassword,
          right: (
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword((prev) => !prev)}
            />
          ),
        }}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Zaloguj się
      </Button>
    </View>
  );
};

export default AuthForm;
