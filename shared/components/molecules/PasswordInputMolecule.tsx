import React, { useState } from "react";
import {
  View,
  Text,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TextInputAtom from "../atoms/TextInputAtom";
import { MaterialIcons } from "@expo/vector-icons";

type PasswordInputMoleculeProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
};

const PasswordInputMolecule: React.FC<PasswordInputMoleculeProps> = ({
  value,
  onChangeText,
  placeholder = "Password",
  error,
}) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputAtom
          placeholder={placeholder}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChangeText}
          error={error}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name={isSecure ? "visibility-off" : "visibility"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0a0a0a",
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: "",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
  },
  iconContainer: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 4,
  },
});

export default PasswordInputMolecule;
