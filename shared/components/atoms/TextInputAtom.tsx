import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type TextInputAtomProps = TextInputProps & {
  error?: string;
};

const TextInputAtom: React.FC<TextInputAtomProps> = ({
  error,
  style,
  ...props
}) => {
  return (
    <>
      <TextInput
        style={[styles.input, style, error && styles.inputError]}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
});

export default TextInputAtom;
