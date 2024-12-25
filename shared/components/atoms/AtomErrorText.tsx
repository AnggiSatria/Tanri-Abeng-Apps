import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface AtomErrorTextProps {
  error?: string;
  style?: TextStyle;
}

const AtomErrorText: React.FC<AtomErrorTextProps> = ({ error, style }) => {
  if (!error) return null;

  return <Text style={[styles.errorText, style]}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginTop: 4,
  },
});

export default AtomErrorText;
