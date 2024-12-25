import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Controller, Control } from "react-hook-form";

interface FormInputProps extends TextInputProps {
  control: Control<any>; // Replace `any` with the appropriate generic type for your form.
  name: string;
  rules?: object;
  placeholder?: string;
  customStyles?: {
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    errorStyle?: TextStyle;
  };
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  customStyles,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                customStyles?.inputStyle,
                error && styles.inputError,
              ]}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...textInputProps}
            />
            {error && (
              <Text style={[styles.errorText, customStyles?.errorStyle]}>
                {error.message || "Invalid input"}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#f44336",
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginTop: 4,
  },
});
