import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface AtomTextInputProps extends TextInputProps {
  hasError?: boolean;
}

const AtomTextInput: React.FC<AtomTextInputProps> = ({
  hasError,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, hasError && styles.inputError, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default AtomTextInput;
