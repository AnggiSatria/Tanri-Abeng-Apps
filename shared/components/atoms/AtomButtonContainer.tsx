import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface AtomButtonContainerProps extends TouchableOpacityProps {
  disabled?: boolean;
  children: React.ReactNode;
}

const AtomButtonContainer: React.FC<AtomButtonContainerProps> = ({
  disabled,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
});

export default AtomButtonContainer;
