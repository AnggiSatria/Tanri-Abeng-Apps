import React, { forwardRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet, View } from "react-native";

type PhoneInputAtomProps = {
  value: string;
  onChangeText: (text: string) => void;
  defaultCode?: any;
  placeholder?: string;
};

const PhoneInputAtom = forwardRef<PhoneInput, PhoneInputAtomProps>(
  ({ value, onChangeText, defaultCode = "ID", placeholder = "" }, ref) => {
    return (
      <View style={styles.container}>
        <PhoneInput
          ref={ref}
          defaultCode={defaultCode}
          value={value}
          onChangeFormattedText={onChangeText}
          containerStyle={styles.inputContainer}
          textContainerStyle={styles.textContainer}
          placeholder={placeholder}
        />
      </View>
    );
  }
);

export default PhoneInputAtom;

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  inputContainer: { borderRadius: 8, backgroundColor: "#f8f9fa" },
  textContainer: { backgroundColor: "#fff" },
});
