import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import AtomTextInput from "../atoms/AtomTextInput";
import AtomErrorText from "../atoms/AtomErrorText";

interface MoleculeInputFieldProps {
  placeholder?: string;
  value: string;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  disabled?: boolean;
  values?: string | any;
}

const MoleculeInputField: React.FC<MoleculeInputFieldProps> = ({
  placeholder,
  value,
  onBlur,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  errorStyle,
  disabled = false,
  values = null,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AtomTextInput
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        hasError={!!error}
        style={inputStyle}
        disabled={disabled}
        values={values}
      />
      <AtomErrorText error={error} style={errorStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default MoleculeInputField;
