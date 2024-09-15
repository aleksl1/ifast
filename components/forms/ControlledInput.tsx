import { FC } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { TextInput, TextInputProps } from "react-native-paper";

type ControlledInputProps = {
  control: any;
  textInputProps: TextInputProps;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

const ControlledInput: FC<ControlledInputProps> = ({
  control,
  textInputProps,
  name,
  rules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <TextInput
          mode="outlined"
          style={{ minWidth: 300 }}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          error={!!error}
          {...textInputProps}
        />
      )}
    />
  );
};

export default ControlledInput;
