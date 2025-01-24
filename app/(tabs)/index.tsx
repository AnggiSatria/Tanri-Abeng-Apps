import React, { useEffect, useState } from "react";
import { View } from "react-native";
import HomeStudent from "./HomeStudent";
import HomeTeacher from "./HomeTeacher";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App: React.FC = () => {
  const [role, setRole] = useState<"student" | "teacher" | any>("student"); // 'student' or 'teacher'
  const [token, setToken] = useState<any>("");

  console.log(role);

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await AsyncStorage.getItem("userToken");
      if (authToken) {
        setToken(authToken);
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [token]);

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await AsyncStorage.getItem("status");
      if (status) {
        setRole(status);
      } else {
        setRole(null);
      }
    };

    fetchStatus();
  }, [token]);

  return (
    <View className="flex-1">
      {role === "student" ? (
        <HomeStudent token={token} />
      ) : (
        <HomeTeacher token={token} />
      )}
    </View>
  );
};

export default App;
