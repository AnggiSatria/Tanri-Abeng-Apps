import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface AtomTextInputProps extends TextInputProps {
  hasError?: boolean;
  disabled?: boolean;
  values?: string | any;
}

const AtomTextInput: React.FC<AtomTextInputProps> = ({
  hasError,
  disabled = false,
  values = null,
  style,
  ...props
}) => {
  console.log(`Test`, disabled);

  return (
    <TextInput
      value={values || ""}
      editable={!disabled}
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
