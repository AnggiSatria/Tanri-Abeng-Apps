import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import PhoneInputAtom from "../atoms/AtomPhoneInput";

type PhoneFieldProps = {
  control: any; // dari useForm
  name: string;
  rules?: object;
  defaultCode?: string;
  placeholder?: string;
};

const PhoneField = ({
  control,
  name,
  rules,
  defaultCode,
  placeholder,
}: PhoneFieldProps) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <PhoneInputAtom
              value={value}
              onChangeText={onChange}
              defaultCode={defaultCode}
              placeholder={placeholder}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default PhoneField;

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  errorText: { color: "red", marginTop: 4 },
});
