import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface AtomButtonTextProps {
  text: string;
  style?: TextStyle;
}

const AtomButtonText: React.FC<AtomButtonTextProps> = ({ text, style }) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AtomButtonText;
